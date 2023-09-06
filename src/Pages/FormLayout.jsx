import {useContext} from 'react';
import { useNavigate } from 'react-router';
import { PersonalInformation } from '../sections/PersonalInformation.jsx';
import { PastApplications } from '../sections/PastApplications.jsx';
import { LifeStyleSection } from '../sections/LifeStyleSection.jsx';
import { Wellness } from '../sections/Wellness.jsx';
import { MedicalSection } from '../sections/MedicalSection.jsx';
import Sidebar from '../Components/Sidebar.jsx';
import '../Styles/FormLayout.css';
import StepperBar from '../Components/Stepper.jsx';
import FormContext from '../Components/FormContext.jsx';

export const FormLayout = () => {
  const {activeSection, setActiveSection} = useContext(FormContext);
  const navigate = useNavigate();

  const steps = ['Personal Information', 'Past Applications', 'Lifestyle', 'Wellness', 'Medical', 'Review'];
  let title = steps[activeSection];

  const goToReview = () => {
    navigate("/review");
  };

  const goToPreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(prevSection => prevSection - 1);
    }
  };

  const goToNextSection = () => {
    if (activeSection < steps.length - 1) {
      setActiveSection(prevSection => prevSection + 1);
    } else {
      goToReview();
    }
  };
  return (
    <div>
      <h1 className="Complete">
        Complete{" "}
        <span className="Rest">Your Evidence of Insurability Form</span>
      </h1>

      <div className="parent">
        <div className="medical-questions-title"> {title} </div>


          <div className="stepper-container"> 
            <StepperBar steps={steps} />
          </div>
            <div className="jsonForms">
              <div className="section">
                {/* {activeSection == 0 &&<PersonalInformation />}
                {activeSection == 1 &&<PastApplications />} */}
                {activeSection == 2 && <LifeStyleSection index={0} />}
                {activeSection == 3 && <Wellness />}
                {/* {activeSection == 4 && <MedicalSection />} */}
              </div>
            </div>
            <button className="previous-button" onClick={goToPreviousSection} disabled={activeSection === 0}>
              Previous Section
            </button>
            <button className="next-section-button" onClick={goToNextSection} disabled={activeSection === steps.length - 1}>
              Next Section
            </button>
            <button className="next-button" onClick={goToReview}>
              Go To Review
            </button>
            <Sidebar />

        </div>
    </div>
  );
};

export default FormLayout;