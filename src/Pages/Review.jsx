import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from '../Components/FormContext';
import '../Styles/Review.css';

export const Review = () => {
  const [signature, setSignature] = useState('');
  const navigate = useNavigate();
  
  // Use the FormContext
  const { saveToDatabase } = useContext(FormContext);

  const customTitles = ["Personal Information", "Past Applications", "LifeStyle", "Wellness", "Medical", "Authorization and Consent"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save form data to database
    await saveToDatabase();
    
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
                  onChange={e => setSignature(e.target.value)}
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

      <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <button type="submit" className='submit-button'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Review;