import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import FormContext from '../Components/FormContext';
import PDFGeneration from '../Components/PDFGeneration';
import '../Styles/Confirmation.css';

export const Confirmation = () => {
  const location = useLocation();
  const { formData } = useContext(FormContext);

  return (
    <div className='confirmation-wrapper'>
      <div className='confirmation-message'>
        <h2>Thank You!</h2>
        <p>Your form has been submitted successfully.</p>
      </div>
      
      <PDFGeneration signature={location.state.signature} formData={formData} />

    </div>
  );
};

export default Confirmation;