import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import '../Styles/Stepper.css';

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
      <div className="button-container">
        {/* <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button> */}
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button> */}
      </div>
    </div>
  );
};

StepperBar.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default StepperBar;
