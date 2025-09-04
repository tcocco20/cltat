"use client";

import { SQUARE_APP_ID, SQUARE_LOCATION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

const verificationDetails = {
  amount: "10.00",
  billingContact: {
    givenName: "John",
    familyName: "Doe",
    email: "john.doe@square.example",
    phone: "3214563987",
    addressLines: ["123 Main Street", "Apartment 1"],
    city: "Oakland",
    state: "CA",
    countryCode: "US",
  },
  currencyCode: "USD",
  intent: "CHARGE",
  customerInitiated: true,
  sellerKeyedIn: false,
};

export default function SignUpButton() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [payments, setPayments] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [card, setCard] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const initSquare = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).Square) {
        console.error("Square SDK not loaded");
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const paymentsInstance = (window as any).Square.payments(
          SQUARE_APP_ID,
          SQUARE_LOCATION_ID
        );
        setPayments(paymentsInstance);
      } catch (err) {
        console.error("Square init error:", err);
      }
    };

    initSquare();
  }, []);

  useEffect(() => {
    if (card) {
      return;
    }
    const createCard = async () => {
      if (!payments) return;

      const cardInstance = await payments.card();
      await cardInstance.attach("#card-container");
      setCard(cardInstance);
    };

    createCard();
  }, [payments, card]);

  const handlePayment = async () => {
    if (!card) return;

    try {
      // Tokenize the card info
      const result = await card.tokenize(verificationDetails);

      if (result.status === "OK") {
        setStatus("Processing...");

        // Send sourceId + amount to backend
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceId: result.token,
            amount: 1000, // in cents, so this = $10.00
            classId: "80",
          }),
        });

        const data = await res.json();
        console.log("Data: ", data);
        if (data.success) {
          setStatus("Payment Successful ✅");
        } else {
          setStatus("Payment Failed ❌");
        }
      } else {
        setStatus("Card tokenization failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <div id="card-container" className="border p-2 rounded mb-4"></div>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign Up Now
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
