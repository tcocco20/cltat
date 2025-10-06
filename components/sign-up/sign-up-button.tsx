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
import PaidClassForm from "./paid-class-form";
import FreeClassForm from "./free-class-form";

interface SignUpButtonProps {
  classId: number;
  cost: number;
  isPaid: boolean;
  isDisabled: boolean;
}

export default function SignUpButton({
  classId,
  cost,
  isDisabled,
  isPaid,
}: SignUpButtonProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleChangeStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={isDisabled}>
          Sign Up For Class
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[700px] overflow-y-auto max-h-dvh md:max-h-[90dvh]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Sign Up For Class
          </DialogTitle>
          <SignUpSteps currentStep={currentStep} />
        </DialogHeader>
        {isPaid ? (
          <PaidClassForm
            classId={classId}
            cost={cost}
            currentStep={currentStep}
            handleChangeStep={handleChangeStep}
          />
        ) : (
          <FreeClassForm />
        )}
      </DialogContent>
    </Dialog>
  );
}
