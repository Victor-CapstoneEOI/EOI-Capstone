import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import FormContext from '../Components/FormContext';
import PDFGeneration from '../Components/PDFGeneration';
import '../Styles/Confirmation.css';

export const Confirmation = () => {
  const location = useLocation();
  const { formData } = useContext(FormContext);

  // Extract the signature from the query parameters
  const searchParams = new URLSearchParams(location.search);
  const signature = searchParams.get('signature');

  return (
    <div>
      <div className="half-top">
        <div className='ThankYou'>
        <p className='Registration'>Your Form is Complete</p>

          <p className='Joining'>Thank you for completing your Evidence of Insurability.</p>
        </div>
      </div>
      <div className="half-bottom">
        <div className='Download'>
        <PDFGeneration signature={signature} formData={formData} />
        </div>
      </div>
      
    </div>
  );
};

export default Confirmation;
