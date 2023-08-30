import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from './img/ProfilePic.png';
import CornerLogo from './img/cornervictor.png';
import './Profile.css';

const Profile = () => {
  const [user] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    bio: "I love coding and exploring new technologies.", 
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
              src={ProfilePic || ProfilePic} // Use ProfilePic if user.profilePicture is not available
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-picture"
            />
            <div className="name-info">
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
            </div>
          </div>
        </div>

        <div className="profile-bio">
          <h2>About Me</h2>
          <p>{user.bio}</p>
          <p>Email: {user.email}</p>
        </div>

        <div className="button">
        <button onClick={goToFormLayout}>Enroll Now</button>
        </div>      
      </div>
    </div>
  );
};

export default Profile;
