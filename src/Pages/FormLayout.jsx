import React from 'react';
import { useNavigate } from 'react-router';
import { PersonalInformation } from '../sections/personalInformation.jsx';
import { PastApplications } from '../sections/PastApplications.jsx';
import { LifeStyleSection } from '../sections/LifeStyleSection.jsx';
import { Wellness } from '../sections/Wellness.jsx';
import { MedicalSection } from '../sections/MedicalSection.jsx';
import Sidebar from '../Components/Sidebar.jsx';
import '../Styles/FormLayout.css'

export const FormLayout = () => {
  const navigate = useNavigate();

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
        <div className="medical-questions-title"> EOI Form </div>

        <div className="jsonForms">
          {/* <Stepper/> */}
          <div className="section">
            <PersonalInformation />
            <PastApplications />
            <LifeStyleSection index={0} />
            <Wellness />
            <MedicalSection />
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

export default FormLayout 