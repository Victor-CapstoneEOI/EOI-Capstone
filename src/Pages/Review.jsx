import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from '../Components/FormContext';
import '../Styles/Review.css';

export const Review = () => {
  const navigate = useNavigate();

  // Use the FormContext
  const { formData, saveToDatabase, signature, updateSignature } = useContext(FormContext);

  const customTitles = ["Personal Information", "Past Applications", "LifeStyle", "Wellness", "Medical", "Authorization and Consent"];

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Check if the signature is empty
      if (!signature) {
        alert("Please provide a signature before submitting.");
        return;
      }
      
  // Log the formData and signature before saving
  console.log("Saving formData: ", formData);
  console.log("Saving signature: ", signature);

    // Save the complete data to the database
    await saveToDatabase();

    // Navigate to the confirmation page
    navigate(`/confirmation?signature=${signature}`);
  };

  return (
    <div className='pallet'>
      <div className='Title'>Review</div>

      {customTitles.map((title, index) => (
        <details className='dropdown-details' key={index}>
          <summary className='dropdown-summary'>{title}</summary>
          <div className='dropdown-container'>
            {title === 'Authorization and Consent' ? (
              <div className='signature-box'>
                <label htmlFor="signature">Signature: </label>
                <input
                  type="text"
                  id="signature"
                  value={signature}
                  onChange={e => updateSignature(e.target.value)}  // Use the updateSignature function
                />
              </div>
            ) : (
              <select className='dropdown-box'>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            )}
            <button className='edit-button'>Edit</button>
          </div>
        </details>
      ))}

      <div className='form'>
        <form onSubmit={handleSubmit}>
          <button type="submit" className='submit-button'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Review;
