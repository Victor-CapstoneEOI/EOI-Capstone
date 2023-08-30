import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, LinearProgress } from '@mui/material';
import './Stepper.css'; // Import the CSS file

const StepperBar = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={(activeStep / (steps.length - 1)) * 100}
        className="progress-bar"
      />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {activeStep === steps.length ? (
            <div>
              <p className="text-center">All steps completed</p>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div>{/* Render step component */}</div>
              <div className="button-container">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperBar;
