// app/api/create-attendee/route.ts
import { getClassByIdSimple } from "@/lib/actions/wordpress.actions";
import { WP_API_URL, WP_APP_PASSWORD, WP_USERNAME } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      fullName,
      email,
      classId,
      photoId,
      orderId,
      paymentId,
      receiptUrl,
      dateOfBirth,
      DPSST_PSID,
      physicalAddress,
      phoneNumber,
    } = await req.json();

    const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString(
      "base64"
    );

    const classRes = await getClassByIdSimple(classId);

    if (classRes && classRes.spotsTaken >= classRes.totalSpots) {
      return NextResponse.json({ error: "Class is full" }, { status: 400 });
    }

    // 1. Create attendee
    const attendeeRes = await fetch(`${WP_API_URL}/attendee`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "publish",
        title: fullName + " " + classId,
        acf: {
          full_name: fullName,
          email,
          class: classId,
          photo_id: photoId,
          order_id: orderId,
          payment_id: paymentId,
          receipt_url: receiptUrl,
          dob: dateOfBirth,
          dpsst_psid: DPSST_PSID,
          address: physicalAddress,
          phone_number: phoneNumber,
        },
      }),
    });

    const attendee = await attendeeRes.json();

    if (!attendeeRes.ok) {
      return NextResponse.json(
        { error: attendee },
        { status: attendeeRes.status }
      );
    }

    const updatedRes = await fetch(`${WP_API_URL}/classes/${classId}`, {
      method: "POST", // WP REST uses POST for updates
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        acf: {
          total_spots: classRes.totalSpots,
          spots_taken: classRes.spotsTaken + 1,
        },
      }),
    });

    const updatedClass = await updatedRes.json();

    return NextResponse.json({
      attendee,
      updatedClass,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error creating attendee:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
