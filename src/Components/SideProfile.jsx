import React from 'react';
import '../Styles/SideProfile.css';
import Pic from '../img/ProfilePic2.png';

const SideProfile = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com' // Added for the example
  };

  return (
    <div className="Side-profile">
      <div className="pic">
        <img src={Pic} alt={`${user.firstName} ${user.lastName}`} className="picture" />
      </div>
      <div className="name-info">
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <p>{user.email}</p>
        <p>Software Developer</p>
      </div>
      <nav className="menu">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
};

export default SideProfile;
