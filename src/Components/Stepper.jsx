import { useState, useContext, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import '../Styles/Stepper.css';
import FormContext from './FormContext';

const StepperBar = ({ steps }) => {
  const { activeSection } = useContext(FormContext)


  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={(activeSection / (steps.length - 1)) * 100}
        className="progress-bar"
        style={{backgroundColor: 'orange'}}
      />
      <Stepper activeStep={activeSection} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

    
    </div>
  );
};

StepperBar.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default StepperBar;
