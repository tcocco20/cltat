interface SignUpStepsProps {
  currentStep: number;
}

const SignUpSteps = ({ currentStep }: SignUpStepsProps) => {
  return <div>SignUpSteps {currentStep}</div>;
};

export default SignUpSteps;
