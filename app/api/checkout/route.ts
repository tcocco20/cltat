// app/api/checkout/route.ts
import { SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID } from "@/lib/constants";
import { NextResponse, NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { SquareClient, SquareEnvironment } from "square";

export const runtime = "nodejs";

const client = new SquareClient({
  token: SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

type CheckoutBody = {
  classId: string;
  sourceId: string; // Web Payments SDK token (nonce)
  verificationToken?: string; // from payments.verifyBuyer() if you enable SCA
};

export async function POST(req: NextRequest) {
  try {
    const { classId, sourceId, verificationToken } =
      (await req.json()) as CheckoutBody;

    if (!classId || !sourceId) {
      return NextResponse.json(
        { error: "Missing classId or sourceId" },
        { status: 400 }
      );
    }

    // 1) Look up class info (price in cents) from WordPress or your DB.
    // Replace this stub with your real lookup.
    // const classData = await getClassById(body.classId);
    // if (!classData) {
    //   return NextResponse.json({ error: "Class not found" }, { status: 404 });
    // }
    // const { title, priceCents } = classData;

    // 2) (Optional) attach or create a Square customer record.
    // For speed, we'll skip creation and just attach contact info to the payment.

    // 3) Create an Order so the payment is itemized in Square Dashboard.
    //    Use ad hoc line item with your class name/price.
    //    NOTE: amount fields are BigInt in the new SDK.
    const orderIdempotencyKey = randomUUID();

    const orderRes = await client.orders.create({
      idempotencyKey: orderIdempotencyKey,
      order: {
        locationId: SQUARE_LOCATION_ID,
        referenceId: classId, // handy for cross-ref in your system
        lineItems: [
          {
            name: "Test Class", // Replace with class title or generate one
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(100),
              currency: "USD",
            },
          },
        ],
      },
    });

    const order = orderRes.order;
    if (!order?.id) {
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 502 }
      );
    }

    // 4) Take the payment (capture immediately).
    //    You can pass buyer email/phone, referenceId, verificationToken, etc. :contentReference[oaicite:2]{index=2}
    const paymentIdempotencyKey = randomUUID();

    const paymentRes = await client.payments.create({
      idempotencyKey: paymentIdempotencyKey,
      sourceId: sourceId,
      amountMoney: {
        amount: BigInt(100),
        currency: "USD",
      },
      locationId: SQUARE_LOCATION_ID,
      orderId: order.id,
      autocomplete: true, // capture now
      referenceId: classId,
      // appFeeMoney: {
      //   amount: BigInt(100), // use to add $1.00 fee to checkout
      //   currency: "USD",
      // },
      // buyerEmailAddress: buyerEmail, \
      // buyerPhoneNumber: buyerPhone, -- May not need these, but will test them later to see how it shows up to customers
      // note: `Class signup: ${title}`,/
      verificationToken: verificationToken, // include if you run verifyBuyer on the client
    });

    const payment = paymentRes.payment;
    if (!payment?.id) {
      return NextResponse.json(
        { error: "Failed to create payment" },
        { status: 502 }
      );
    }

    // 5) (Recommended) Persist a provisional enrollment in WP with "paid_pending_info".
    //    Do this server-side to avoid exposing secrets.
    // await saveProvisionalEnrollment({
    //   classId: body.classId,
    //   paymentId: payment.id,
    //   orderId: order.id,
    //   amount: Number(payment.amountMoney?.amount ?? 0),
    //   buyerName: body.buyerName,
    //   buyerEmail: body.buyerEmail,
    //   buyerPhone: body.buyerPhone,
    // });

    // 6) Return minimal info your UI needs to proceed.
    return NextResponse.json({
      ok: true,
      paymentId: payment.id,
      orderId: order.id,
      status: payment.status, // e.g., "COMPLETED"
      receiptUrl: payment.receiptUrl,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating checkout:", error);
    const message =
      error?.errors?.[0]?.detail ||
      error?.message ||
      "Unexpected error processing payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
