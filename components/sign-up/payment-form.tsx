"use client";
import React, { useTransition } from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { SQUARE_APP_ID, SQUARE_LOCATION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";
import useCustomerDetailsStore from "@/lib/store/customer-details-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { formatPrice } from "@/lib/utils";
import { Loader } from "lucide-react";
import { toast } from "sonner";

interface PaymentFormProps {
  onChangeStep: (step: number) => void;
  classId: number;
  cost: number;
}

const PaymentForm = ({ onChangeStep, classId, cost }: PaymentFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [payments, setPayments] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [card, setCard] = useState<any>(null);
  const [accepted, setAccepted] = useState(false);
  const [pending, startTransition] = useTransition();

  const customerInformation = useCustomerDetailsStore(
    (state) => state.customerInfo
  );

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

  const handlePayment = () => {
    startTransition(async () => {
      if (!card && !customerInformation) return;
      const verificationDetails = {
        amount: "10.00",
        billingContact: {
          givenName: customerInformation!.firstName,
          familyName: customerInformation!.lastName,
          email: customerInformation!.email,
          phone: customerInformation!.phone,
          addressLines: [
            customerInformation!.addressLineOne,
            customerInformation!.addressLineTwo || "",
          ],
          city: customerInformation!.city,
          state: customerInformation!.state,
          countryCode: customerInformation!.countryCode,
        },
        currencyCode: "USD",
        intent: "CHARGE",
        customerInitiated: true,
        sellerKeyedIn: false,
      };

      try {
        // Tokenize the card info
        const result = await card.tokenize(verificationDetails);

        if (result.status === "OK") {
          // Send sourceId + amount to backend
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sourceId: result.token,
              classId: classId,
            }),
          });

          const data = await res.json();
          console.log("Data: ", data);
          if (data.success) {
            toast.success("Payment Successful! 🎉");
          } else {
            toast.error("Payment Failed ❌");
          }
        } else {
          toast.error("Card tokenization failed. Please check payment details and try again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      }
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Pay for Class</DialogTitle>
        <DialogDescription>
          Please accept terms and conditions and complete payment to finish
          enrolling in class
        </DialogDescription>
      </DialogHeader>
      <Card className="overflow-auto max-h-[250px] sm:max-h-[300px] md:max-h-[400px]">
        <CardContent>
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <CardDescription>
              Please agree to the following terms and conditions
            </CardDescription>
            <ol className="list-decimal space-y-2">
              <li>Cameras must be on at all times (except during breaks).</li>
              <li>
                Microphones are required for the training class and are to be
                muted unless you are speaking.
              </li>
              <li>
                There is no recording of the training either audio or video.
                Anyone found doing this will be removed from the training and
                will receive a failed PS6.
              </li>
              <li>
                All coursework has to be done in English (OAR 259-060-0060 (5)),
                no English translation software, in person interpreters, or
                interpreting aids are allowed during the training course. Anyone
                found to be using this will be removed from the training and
                will receive a failed PS6, and no refund will be issued.
              </li>
              <li>
                During the testing phase, your training manual is to be closed
                and you should be in a distraction free room. Your instructor
                will confirm this prior to you taking the exam, anyone found to
                be cheating during the exam will be removed from the training
                and will receive a failed PS6.
              </li>
              <li>
                Please be respectful during the training to all those in
                attendance, this is a professional environment.
              </li>
              <li>
                You are encouraged to ask questions, there is no such thing as
                stupid questions.
              </li>
              <li>
                You are encouraged to take written notes, you cannot use them on
                the exam but you are encouraged to jot them down.
              </li>
              <li>
                Please do not operate a motor vehicle or heavy machinery while
                attending the class, this is grounds for immediate removal from
                the training course if this occurs.
              </li>
              <li>
                All training space should be conducted in a quiet conducive
                place where interruptions are limited.
              </li>
              <li>
                I understand, if I disconnect and do not reconnect or have
                technical issues that prevent me from continuing and do not
                reconnect, or if I receive a failing grade (Failed PS6) that I
                will not be eligible for a refund.
              </li>
              <li>
                I understand, that I am required to have a working computer with
                a web camera for the duration of the training
              </li>
              <li>
                I also understand, that if I am caught using translation
                software of any kind that I will receive a failing grade (Failed
                PS6) and not be entitled to a refund.
              </li>
            </ol>
          </CardHeader>
        </CardContent>
      </Card>
      <div className="flex items-center gap-2 py-4 px-6 bg-white rounded-lg">
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={(checked) => setAccepted(checked as boolean)}
        />
        <Label htmlFor="terms">
          I have read and agree to the terms and conditions
        </Label>
      </div>

      <div
        id="card-container"
        className={accepted ? "" : "opacity-50 pointer-events-none"}
      >
        <p className="mb-2">Payment Method</p>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onChangeStep(2)}>
          Back
        </Button>
        <Button disabled={!accepted || pending} onClick={handlePayment}>
          {pending ? (
            <>
              <Loader className="animate-spin" /> Processing...
            </>
          ) : (
            <span>Pay {formatPrice(cost)}</span>
          )}
        </Button>
      </DialogFooter>
    </>
  );
};

export default PaymentForm;
