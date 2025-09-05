import React from "react";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface CustomerInformationFormProps {
  onChangeStep: (step: number) => void;
}

const CustomerInformationForm = ({
  onChangeStep,
}: CustomerInformationFormProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Enter Your Information</DialogTitle>
        <DialogDescription>
          Please enter your information to sign up for the class.
        </DialogDescription>
      </DialogHeader>
      <h1 className="text-xl">Dialog Body</h1>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="destructive">Cancel</Button>
        </DialogClose>
        <Button type="submit" onClick={() => onChangeStep(2)}>
          Next Step
        </Button>
      </DialogFooter>
    </>
  );
};

export default CustomerInformationForm;
