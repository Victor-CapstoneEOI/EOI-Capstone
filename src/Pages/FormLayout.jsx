import React from 'react';
import { useNavigate } from 'react-router';
import PersonalInformation from '../sections/PersonalInformation.jsx';
import Sidebar from '../Components/Sidebar.jsx';
import '../Styles/FormLayout.css'
// import Stepper from '../Components/Stepper.jsx'


export const FormLayout = () => {

const navigate = useNavigate();

const goToReview = () =>{
  navigate('/review');  
}


  return (
    <div>
      <h1 className='Complete'>
        Complete <span className='Rest'>Your Evidence of Insurability Form</span>
      </h1>

 

      <div className='parent'>
        <div className='medical-questions-title'>Medical Questions</div>
        
        <div className='Inputbox'>
          <PersonalInformation/>
        </div>
        <button className='next-button' onClick={goToReview}>Next Page</button>
        <Sidebar/>
      </div>
    </div>
  );
}

export default FormLayout;
