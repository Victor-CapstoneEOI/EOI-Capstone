import React, { useState } from 'react';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`text-blue-500 hover:text-blue-700 ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Back
          </button>
          <div className="flex items-center space-x-4 flex-grow">
            <div className="relative h-2 flex-grow">
              <div
                className="absolute h-2 bg-blue-500"
                style={{
                  width: `${(activeStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
            <div className="text-lg font-semibold">{steps[activeStep]}</div>
          </div>
          <div className="space-x-2">
            <button
              onClick={handleReset}
              className="text-red-500 hover:text-red-700"
            >
              Reset
            </button>
            <button
              onClick={handleNext}
              disabled={isLastStep}
              className={`text-blue-500 ${isLastStep ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-700'}`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          {isLastStep && (
            <div className="text-green-600 font-semibold">All Steps Complete!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
