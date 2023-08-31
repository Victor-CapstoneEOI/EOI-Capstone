import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from './img/ProfilePic.png';
import CornerLogo from './img/cornervictor.png';
import './FrenchProfile.css'

const FrenchProfile = () => {
  const [user] = useState({
    firstName: "Monsieur",
    lastName: "X",
    email: "MoniseurX@exemple.com", 
  });

  const navigate = useNavigate();

  const goToFormLayout = () => {
    navigate('/formlayout'); 
  };

  return (
    <div>
      <img src={CornerLogo} alt="cornervictor" className="cornerlogo" />
      <div className="profile">
        <div className="profile-header">
          <div className="profile-info">
            <img
              src={ProfilePic || ProfilePic} 
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-picture"
            />
            <div className="name-info">
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
            </div>
          </div>
        </div>

        <div className="profile-bio">
          <h2>Position</h2>
          <p>{user.bio}</p>
          <p>Courriel: {user.email}</p>
        </div>

        <div className="button">
        <button onClick={goToFormLayout}>S'inscrire</button>
        </div>      
      </div>
    </div>
  );
};

export default FrenchProfile;
