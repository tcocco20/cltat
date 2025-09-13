"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

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
  children,
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
        children
      )}
    </Button>
  );
};

export default CancelRegistrationButton;
