import { getAttendeeById } from "@/lib/actions/wordpress.actions";
import React from "react";

const RegistrationDetailsPage = async (props: {
  params: Promise<{
    attendeeId: string;
  }>;
}) => {
  const { attendeeId } = await props.params;
  const attendeeData = await getAttendeeById(Number(attendeeId));

  return (
    <div className="mt-40">RegistrationDetailsPage: {attendeeData.id}</div>
  );
};

export default RegistrationDetailsPage;
