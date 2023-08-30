import React from 'react';
import { useNavigate } from 'react-router';
import CornerLogo from './img/cornervictor.png';
import './FromLayout.css'
.
export const FormLayout = () => {
  return (
    <div>
      <img src={CornerLogo} alt="cornervictor" className="cornerlogo" />
      <h1 className='Complete'>
        Complete <span className='Rest'>Your Evidence of Insurability Form</span>
      </h1>
      <div className='parent-container'>
        <div className='medical-questions-title'>Medical Questions</div>
        <div className='container'>
          {/* Your medical questions content goes here */}
        </div>
      </div>
    </div>
  );
}

export default FormLayout;
