// app/api/checkout/route.ts
import {
  APP_URL,
  SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID,
} from "@/lib/constants";
import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

const client = new SquareClient({
  token: SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export async function POST(req: Request) {
  try {
    const { classId } = await req.json();

    const { paymentLink } = await client.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      quickPay: {
        name: "Test Product",
        priceMoney: { amount: BigInt(100), currency: "USD" },
        locationId: SQUARE_LOCATION_ID,
      },
      checkoutOptions: {
        redirectUrl: APP_URL + `/sign-up/${classId}/payment/success`,
        // appFeeMoney: { amount: BigInt(10), currency: "USD" }, Use to charge $.10 fee, will need to learn how to do this
      },
    });

    return NextResponse.json({
      checkoutUrl: paymentLink?.url || "",
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
