import React from 'react';
import '../Styles/SideProfile.css';
import Pic from '../img/ProfilePic2.png'

const SideProfile = () => {
  const user = {
    firstName: 'John', // Placeholder - you would typically get this from some API or state
    lastName: 'Doe'    // Placeholder - you would typically get this from some API or state
  };

  return (
    <div className="Side-profile">
      <div className='pic'>
        <img
          src={Pic} // Removed the OR condition since ProfilePic is now defined
          alt={`${user.firstName} ${user.lastName}`}
          className="picture"
        />
      </div>
      <div className="name">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <p>{user.email}</p>
            <p>Software Developer</p>
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default SideProfile;

