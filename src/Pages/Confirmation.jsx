import React from 'react';
import '../Styles/Confirmation.css';

export const Confirmation = () => {
  return (
    <div>
      <div className="half-top">
        <div className='ThankYou'>
            <p>Thanks for joining.</p>
            <p>Your registration is complete</p>
        </div>
      </div>
      <div className="half-bottom">
        <div className='Download'>
            <p>If the form hasn't been downloaded automatically</p>
            <p>to your computer, you can use this <span className="bolder-link">link</span> to initiate </p>
            <p>the download.</p>
        </div>
      </div>
    </div>
  );
};


export default Confirmation;
