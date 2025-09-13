import CancelRegistrationButton from "@/components/registration/cancel-registration-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAttendeeById } from "@/lib/actions/wordpress.actions";
import Link from "next/link";

const RegistrationDetailsPage = async (props: {
  params: Promise<{
    attendeeId: string;
  }>;
}) => {
  const { attendeeId } = await props.params;
  const attendeeData = await getAttendeeById(Number(attendeeId));

  const atLeast24Hours =
    new Date(attendeeData.classData.date).getTime() - Date.now() <
    24 * 60 * 60 * 1000;

  return (
    <section className="w-full flex-1 flex justify-center items-center flex-col gap-4 px-4">
      <h1 className="text-3xl font-bold">
        Thank you for signing up, {attendeeData.fullName}!
      </h1>
      <h3 className="text-xl">Here are your registration details:</h3>
      <Card className="container max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Registration Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-semibold">Attendee:</span>{" "}
            {attendeeData.fullName}
          </p>
          <p>
            <span className="font-semibold">Class:</span>{" "}
            {attendeeData.classData.type}
          </p>
          <p>
            <span className="font-semibold">Date & Time:</span>{" "}
            {new Date(attendeeData.classData.date).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          <div>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {attendeeData.classData.isRemote
                ? "Remote"
                : attendeeData.classData.location || "TBA"}
            </p>
            {attendeeData.classData.isRemote && (
              <p className="text-sm">Class link will be sent in email</p>
            )}
          </div>
          <p>
            <span className="font-semibold">Cost:</span> $
            {attendeeData.classData.cost.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {attendeeData.classData.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {attendeeData.receiptUrl && (
            <Button asChild>
              <Link
                href={attendeeData.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Receipt
              </Link>
            </Button>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <CancelRegistrationButton
                atLeast24Hours={atLeast24Hours}
                paymentId={attendeeData.paymentId}
                classId={attendeeData.classData.id}
                attendeeId={attendeeData.id}
              >
                Cancel Registration
              </CancelRegistrationButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Cancellations must happen at least 24 hours before the class
                date and time.
              </p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </section>
  );
};

export default RegistrationDetailsPage;
