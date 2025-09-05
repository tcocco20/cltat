"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUpSteps from "./sign-up-steps";
import { useState } from "react";
import CustomerInformationForm from "./customer-information-form";
import CustomerIdentificationForm from "./customer-indentification-form";
import PaymentForm from "./payment-form";

export default function SignUpButton() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleChangeStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Sign Up For Class</Button>
      </DialogTrigger>
      <DialogContent /* className="sm:max-w-[425px]" add classes here to control the max width */
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Sign Up For Class
          </DialogTitle>
          <SignUpSteps currentStep={currentStep} />
        </DialogHeader>
        {currentStep === 1 && (
          <CustomerInformationForm onChangeStep={handleChangeStep} />
        )}
        {currentStep === 2 && (
          <CustomerIdentificationForm onChangeStep={handleChangeStep} />
        )}
        {currentStep === 3 && <PaymentForm onChangeStep={handleChangeStep} />}
      </DialogContent>
    </Dialog>
  );
}
