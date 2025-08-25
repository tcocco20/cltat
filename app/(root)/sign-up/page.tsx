import ClassesDisplay from "@/components/sign-up/classes-display";
import React from "react";

const SignupPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <section className="container grid grid-cols-3 gap-4 mt-24">
        <div className="col-span-1">
          <ClassesDisplay />
        </div>
        <div className="col-span-2">Right Side Content</div>
      </section>
    </div>
  );
};

export default SignupPage;
