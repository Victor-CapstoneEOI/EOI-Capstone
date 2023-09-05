import {useContext} from 'react';
import { useNavigate } from 'react-router';
import { PersonalInformation } from '../sections/personalInformation.jsx';
import { PastApplications } from '../sections/PastApplications.jsx';
import { LifeStyleSection } from '../sections/LifeStyleSection.jsx';
import { Wellness } from '../sections/Wellness.jsx';
import { MedicalSection } from '../sections/MedicalSection.jsx';
import Sidebar from '../Components/Sidebar.jsx';
import '../Styles/FormLayout.css';
import StepperBar from '../Components/Stepper.jsx';
import FormContext from '../Components/FormContext.jsx';

export const FormLayout = () => {
  const {activeSection} = useContext(FormContext)
  const navigate = useNavigate();

  const steps = ['Personal Information', 'Past Applications', 'Lifestyle', 'Wellness', 'Medical', 'Review']

  let title = steps[activeSection] 

  const goToReview = () => {
    navigate("/review");
  };
  return (
    <div>
      <h1 className="Complete">
        Complete{" "}
        <span className="Rest">Your Evidence of Insurability Form</span>
      </h1>

      <div className="parent">
        <div className="medical-questions-title"> {title} </div>
<<<<<<< HEAD
        
        <div className="stepper-container"> 
        
          <StepperBar steps={steps} />
        </div>
     
        <div className="jsonForms">

          <div className="section">
            {activeSection == 0 &&<PersonalInformation />}
            {activeSection == 1 &&<PastApplications />}
            {activeSection == 2 && <LifeStyleSection index={0} />}
            {activeSection == 3 && <Wellness />}
            {activeSection == 4 && <MedicalSection />}
=======

          <div className="stepper-container"> 
            <StepperBar steps={steps} />
>>>>>>> main
          </div>
            <div className="jsonForms">
              <div className="section">
                {activeSection == 0 &&<PersonalInformation />}
                {activeSection == 1 &&<PastApplications />}
                {activeSection == 2 && <LifeStyleSection index={0} />}
                {activeSection == 3 && <Wellness />}
                {activeSection == 4 && <MedicalSection />}
              </div>
            </div>
          <button className="next-button" onClick={goToReview}>
            Next Page
          </button> 
            <Sidebar />

        </div>
    </div>
  );
};

export default FormLayout;
