import ClassSelector from "@/components/sign-up/class-selector";
import {
  getActiveClasses,
  getClassTypesSimple,
} from "@/lib/actions/wordpress.actions";
import React from "react";

const SignupPage = async () => {
  const classTypes = await getClassTypesSimple();
  const classes = await getActiveClasses();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-12 md:pt-20">
      <ClassSelector classes={classes} classTypes={classTypes} />
    </div>
  );
};

export default SignupPage;
