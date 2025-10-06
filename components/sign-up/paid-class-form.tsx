"use client";
import SquareWrapper from "./square-wrapper";
import CustomerInformationForm from "./customer-information-form";
import CustomerIdentificationForm from "./customer-identification-form";
import PaymentForm from "./payment-form";

interface PaidClassFormProps {
  classId: number;
  cost: number;
  currentStep: number;
  handleChangeStep: (step: number) => void;
}

const PaidClassForm = ({
  classId,
  cost,
  currentStep,
  handleChangeStep,
}: PaidClassFormProps) => {
  return (
    <SquareWrapper>
      {currentStep === 1 && (
        <CustomerInformationForm onChangeStep={handleChangeStep} />
      )}
      {currentStep === 2 && (
        <CustomerIdentificationForm onChangeStep={handleChangeStep} />
      )}
      {currentStep === 3 && (
        <PaymentForm
          cost={cost}
          classId={classId}
          onChangeStep={handleChangeStep}
        />
      )}
    </SquareWrapper>
  );
};

export default PaidClassForm;
