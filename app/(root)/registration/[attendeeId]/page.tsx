import React from "react";

const RegistrationDetailsPage = async (props: {
  params: Promise<{
    attendeeId: string;
  }>;
}) => {
  const { attendeeId } = await props.params;

  return <div className="mt-40">RegistrationDetailsPage: {attendeeId}</div>;
};

export default RegistrationDetailsPage;
