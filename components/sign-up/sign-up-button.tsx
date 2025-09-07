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
import SquareWrapper from "./square-wrapper";

interface SignUpButtonProps {
  classId: string;
}

export default function SignUpButton({ classId }: SignUpButtonProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleChangeStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Sign Up For Class</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[700px] overflow-y-auto max-h-dvh">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Sign Up For Class
          </DialogTitle>
          <SignUpSteps currentStep={currentStep} />
        </DialogHeader>
        <SquareWrapper>
          {currentStep === 1 && (
            <CustomerInformationForm onChangeStep={handleChangeStep} />
          )}
          {currentStep === 2 && (
            <CustomerIdentificationForm onChangeStep={handleChangeStep} />
          )}
          {currentStep === 3 && (
            <PaymentForm classId={classId} onChangeStep={handleChangeStep} />
          )}
        </SquareWrapper>
      </DialogContent>
    </Dialog>
  );
}
