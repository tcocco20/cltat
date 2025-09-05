import { Button } from "../ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface CustomerIdentificationFormProps {
  onChangeStep: (step: number) => void;
}

const CustomerIdentificationForm = ({
  onChangeStep,
}: CustomerIdentificationFormProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Identification Information</DialogTitle>
        <DialogDescription>
          Upload a valid ID for verification purposes.
        </DialogDescription>
      </DialogHeader>
      <h1 className="text-xl">Dialog Body</h1>
      <DialogFooter>
        <Button variant="outline" onClick={() => onChangeStep(1)}>
          Back
        </Button>
        <Button type="submit" onClick={() => onChangeStep(3)}>
          Next Step
        </Button>
      </DialogFooter>
    </>
  );
};

export default CustomerIdentificationForm;
