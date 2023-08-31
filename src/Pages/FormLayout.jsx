import React from 'react';
import { useNavigate } from 'react-router';
import PersonalInformation from '../sections/PersonalInformation.jsx'
import '../Style/FormLayout.css'

export const FormLayout = () => {
  return (
    <div>
      <h1 className='Complete'>
        Complete <span className='Rest'>Your Evidence of Insurability Form</span>
      </h1>
      <div className='parent-container'>
        <div className='medical-questions-title'>Medical Questions</div>
        <div className='container'>
          <PersonalInformation/>
        </div>
      </div>
    </div>
  );
}

export default FormLayout;
