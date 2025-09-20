"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface CancelRegistrationButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  atLeast24Hours: boolean;
  paymentId: string;
  classId: number;
  attendeeId: number;
}

const CancelRegistrationButton = ({
  atLeast24Hours,
  paymentId,
  classId,
  attendeeId,
  ...props
}: CancelRegistrationButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRefund = async () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/cancel-registration`, {
          method: "POST",
          body: JSON.stringify({
            paymentId,
            classId,
            attendeeId,
          }),
        });
        const data = await res.json();
        if (!res.ok) toast.error(data.error || "Refund failed");

        toast.success("Refund successful, you will receive an email soon.");
        router.push("/");
      } catch (error) {
        toast.error("Refund failed: " + error);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={atLeast24Hours}>
          Cancel Registration
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will cancel your registration and
            issue a refund.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Go Back</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={atLeast24Hours || isPending}
            {...props}
            onClick={handleRefund}
          >
            {isPending ? (
              <>
                <Loader className="mr-2 animate-spin" /> {"Pending..."}
              </>
            ) : (
              "Cancel Registration"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelRegistrationButton;
