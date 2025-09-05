import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface SignUpStepsProps {
  currentStep: number;
}

const SignUpSteps = ({ currentStep }: SignUpStepsProps) => {
  return (
    <div className="relative w-full flex justify-between items-center">
      <Progress
        value={Math.round(((currentStep - 1) / 2) * 100)}
        className="absolute w-full z-0"
      />
      <Badge className="z-10 text-base rounded-full px-4">1</Badge>
      <Badge
        className="z-10 text-base rounded-full px-4"
        variant={currentStep >= 2 ? "default" : "secondary"}
      >
        2
      </Badge>
      <Badge
        className="z-10 text-base rounded-full px-4"
        variant={currentStep === 3 ? "default" : "secondary"}
      >
        3
      </Badge>
    </div>
  );
};

export default SignUpSteps;
