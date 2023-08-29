import React, { useState } from 'react';
import {
  Stepper,
  Step,
  Button,
  Progress,
  Div,
  Flex,
  Text,
} from 'tailwindcss-react';

const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: 'Step 1',
      content: 'This is the first step.',
    },
    {
      title: 'Step 2',
      content: 'This is the second step.',
    },
    {
      title: 'Step 3',
      content: 'This is the third step.',
    },
    {
      title: 'Step 4',
      content: 'This is the fourth step.',
    },
    {
      title: 'Step 5',
      content: 'This is the fifth step.',
    },
    {
      title: 'Step 6',
      content: 'This is the sixth step.',
    },
  ];

  const handleBackClick = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleResetClick = () => {
    setCurrentStep(1);
  };

  return (
    <Div>
      <Stepper>
        {steps.map((step, index) => (
          <Step
            key={index}
            active={currentStep === index + 1}
            title={step.title}
            content={step.content}
          ></Step>
        ))}
      </Stepper>
      <Flex justifyContent="center">
        <Button
          variant="primary"
          disabled={currentStep === 1}
          onClick={handleBackClick}
        >
          Back
        </Button>
        <Button
          variant="primary"
          disabled={currentStep === steps.length}
          onClick={handleNextClick}
        >
          Next
        </Button>
        <Button
          variant="primary"
          onClick={handleResetClick}
        >
          Reset
        </Button>
      </Flex>
      {currentStep === steps.length && (
        <Text>
          All steps complete!
        </Text>
      )}
    </Div>
  );
};

export default StepperComponent;
