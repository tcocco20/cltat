import ClassesDisplay from "@/components/sign-up/classes-display";
import SelectedClassInfo from "@/components/sign-up/selected-class-info";
import React from "react";

const SignupPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-12 md:pt-20">
      <section className="container max-w-5xl px-2 sm:px-0 grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <ClassesDisplay />
        </div>
        <div className="md:col-span-3">
          <SelectedClassInfo selectedClass={"Placeholder"} />
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
