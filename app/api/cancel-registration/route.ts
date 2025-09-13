import { getClassByIdSimple } from "@/lib/actions/wordpress.actions";
import {
  SQUARE_ACCESS_TOKEN,
  WP_API_URL,
  WP_APP_PASSWORD,
  WP_USERNAME,
} from "@/lib/constants";
import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

export const runtime = "nodejs";

const client = new SquareClient({
  token: SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

type RefundRequest = {
  paymentId: string;
  classId: number;
  attendeeId: number;
};

export async function POST(req: Request) {
  const rightNow = Date.now();
  try {
    const { paymentId, classId, attendeeId } =
      (await req.json()) as RefundRequest;
    const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString(
      "base64"
    );

    if (!paymentId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const classData = await getClassByIdSimple(classId);
    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    if (classData.date.getTime() - rightNow < 24 * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: "Cannot cancel class within 24 hours" },
        { status: 400 }
      );
    }

    const amount = classData.cost;

    const updatedRes = await fetch(`${WP_API_URL}/classes/${classId}`, {
      method: "POST", // WP REST uses POST for updates
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        acf: {
          total_spots: classData.totalSpots,
          spots_taken: classData.spotsTaken - 1,
        },
      }),
    });

    if (!updatedRes.ok) {
      return NextResponse.json(
        { error: "Failed to update class" },
        { status: 500 }
      );
    }

    // Refund API expects an idempotency key (unique string per request)
    const idempotencyKey = crypto.randomUUID();

    const response = client.refunds.refundPayment({
      idempotencyKey,
      amountMoney: {
        amount: BigInt(amount * 100),
        currency: "USD",
      },
      //   appFeeMoney: {
      //     amount: BigInt(100),
      //     currency: "USD",
      //   },
      paymentId,
    });

    const { refund } = await response;

    if (refund?.status === "FAILED" || refund?.status === "REJECTED") {
      return NextResponse.json(
        { error: "Refund failed please try again" },
        { status: 500 }
      );
    }

    // Optionally: update attendee/class in WP here
    const attendeeRes = await fetch(
      `${WP_API_URL}/attendee/${attendeeId}?force=true`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!attendeeRes.ok) {
      throw new Error(`Failed to delete attendee: ${attendeeRes.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
