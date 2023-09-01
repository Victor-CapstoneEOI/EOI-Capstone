import React from 'react';
import { useNavigate } from 'react-router';
import PersonalInformation from '../sections/PersonalInformation.jsx';
import Sidebar from '../Components/Sidebar.jsx';
import StepperBar from '../Components/Stepper.jsx'; // Import StepperBar
import '../Styles/FormLayout.css';

export const FormLayout = () => {
  // Define the steps for your StepperBar
  const steps = ['Step 1: Personal Info', 'Step 2: Medical History', 'Step 3: Wellness', 'Step 4: Lifestyle', 'Step 5: Additional Info', 'Step 6: Review'];

  return (
    <div className="main-layout"> {/* Added a main layout class */}
      <h1 className='Complete'>
        Complete <span className='Rest'>Your Evidence of Insurability Form</span>
      </h1>
      <div className='parent-container'>
        <div className='medical-questions-title'>Medical Questions</div>

        <div className="stepper-bar">
          <StepperBar steps={steps} />
        </div>

        <div className='container-wrapper'>
          <div className="container">
            <PersonalInformation />
          </div>
        </div>
      </div>

      <Sidebar />
    </div>
  );
}

export default FormLayout;
