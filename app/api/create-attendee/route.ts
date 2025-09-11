// app/api/create-attendee/route.ts
import { WP_API_URL, WP_APP_PASSWORD, WP_USERNAME } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName, classId, photoId, orderId, paymentId, receiptUrl } =
      await req.json();

    const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString(
      "base64"
    );

    const classRes = await fetch(
      `${process.env.WP_URL}/wp-json/wp/v2/classes/${classId}`,
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );

    const classData = await classRes.json();
    let currentSpots = classData.acf?.spots_taken;
    const totalSpots = classData.acf?.total_spots;

    if (currentSpots && currentSpots === totalSpots) {
      return NextResponse.json({ error: "Class is full" }, { status: 400 });
    }

    // 1. Create attendee
    const attendeeRes = await fetch(`${WP_API_URL}/wp-json/wp/v2/attendee`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: fullName,
        status: "publish",
        acf: {
          fullName,
          classId,
          photoId,
          orderId,
          paymentId,
          receiptUrl,
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

    // 2. Update class spots_taken
    if (currentSpots === null || currentSpots === undefined) {
      currentSpots = 0;
    }

    const updatedRes = await fetch(
      `${process.env.WP_URL}/wp-json/wp/v2/class/${classId}`,
      {
        method: "POST", // WP REST uses POST for updates
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acf: {
            spots_taken: currentSpots + 1,
          },
        }),
      }
    );

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
