// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfilePic from "../img/ProfilePic.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faInbox,
//   faAddressBook,
//   faUsers,
//   faCalendarDays,
//   faLandmark,
//   faComment,
//   faSuitcaseMedical,
//   faNewspaper,
//   faBusinessTime,
//   faAddressCard,
// } from "@fortawesome/free-solid-svg-icons";
// import "../Styles/FrenchProfile.css";

// const FrenchProfile = () => {
//   const [user] = useState({
//     firstName: "John",
//     lastName: "Doe",
//     email: "johndoe@example.com",
//   });

//   const navigate = useNavigate();

//   const goToFormLayout = () => {
//     navigate("/formlayout");
//   };

//   return (
//     <div className="main-container">
//       <div className="profile-container">
//         <div className="profile-header">
//           <div className="profile-info">
//             <img
//               src={ProfilePic || ProfilePic}
//               alt={`${user.firstName} ${user.lastName}`}
//               className="profile-picture"
//             />
//           </div>
//         </div>
//         <div className="profile-content">
//           <div className="name-info">
//             <h1>{`${user.firstName} ${user.lastName}`}</h1>
//             <p>{user.email}</p>
//             <p>Software Developer</p>
//           </div>
//           <div className="buttons-container">
//             <div className="button-row">
//               <button style={{ marginRight: "30px" }}>
//                 <FontAwesomeIcon icon={faInbox} />
//               </button>
//               <button>
//                 <FontAwesomeIcon icon={faAddressBook} />
//               </button>
//             </div>
//             <div className="button-row">
//               <button style={{ marginRight: "30px" }}>
//                 <FontAwesomeIcon icon={faComment} />
//               </button>
//               <button>
//                 <FontAwesomeIcon icon={faCalendarDays} />
//               </button>
//             </div>
//             <div className="button-row">
//               <button style={{ marginRight: "30px" }}>
//                 <FontAwesomeIcon icon={faLandmark} />
//               </button>
//               <button onClick={goToFormLayout}>
//                 <FontAwesomeIcon icon={faUsers} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="dashboard-container">
//         <div className="dashboard-left">
//           <div className="dashboard-icon">
//             <FontAwesomeIcon icon={faSuitcaseMedical} size="3x" />
//             <p>Medical</p>
//           </div>
//           <div className="dashboard-icon">
//             <FontAwesomeIcon icon={faBusinessTime} size="3x" />
//             <p>Time</p>
//           </div>
//           <div className="dashboard-icon">
//             <FontAwesomeIcon icon={faNewspaper} size="3x" />
//             <p>News</p>
//           </div>
//           <div className="dashboard-icon">
//             <FontAwesomeIcon icon={faAddressCard} size="3x" />
//             <p>Emergency Contact</p>
//           </div>
//         </div>
//         <div className="dashboard-main"></div>
//       </div>
//     </div>
//   );
// };

// export default FrenchProfile;






import React from 'react';
import SideProfile from '../Components/SideProfile';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faAddressBook,
  faUsers,
  faCalendarDays,
  faLandmark,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import '../Styles/FrenchProfile.css';

const FrenchProfile = () => {
  const navigate = useNavigate();

  const goToFormLayout = () => {
    navigate("/formlayout");
  };

  return (
    <div className='SProfile'>
      <SideProfile/>
      <div className='Name'>
        <h1>John Doe</h1>
        <div className='TransparentBox'>
          <div className='button-container'>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon icon={faInbox} />
                <span>Inbox</span>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon icon={faAddressBook} />
                <span>Contacts</span>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon icon={faComment} />
                <span>Messenger</span>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon icon={faCalendarDays} />
                <span>Time Off</span>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon icon={faLandmark} />
                <span>Accounts</span>
              </div>
            </button>
            <button onClick={goToFormLayout} className='square-button'>
              <div>
                <FontAwesomeIcon icon={faUsers} />
                <span>Group Benefits</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrenchProfile;
















