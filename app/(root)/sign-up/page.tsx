import ClassSelector from "@/components/sign-up/class-selector";
import React from "react";

const SignupPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-12 md:pt-20">
      <ClassSelector />
    </div>
  );
};

export default SignupPage;
