import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "./img/ProfilePic.png";
import GroupBenefits from "./img/GroupBenefits.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faAddressBook,
  faUsers,
  faCalendarDays,
  faLandmark,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import "./Profile.css";

const Profile = () => {
  const [user] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
  });

  const navigate = useNavigate();

  const goToFormLayout = () => {
    navigate("/formlayout");
  };

  return (
    <div>
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <img
              src={ProfilePic || ProfilePic}
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-picture"
            />
            <div className="group-benefits-container">
              <img
                src={GroupBenefits}
                alt="GroupBenefits"
                className="group-benefits"
              />
            </div>
          </div>
        </div>
        <div className="profile-content">
          <div className="name-info">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <p>{user.email}</p>
            <p>Software Developer</p>
          </div>
          <div className="buttons-container">
            <div className="button-row">
              <button style={{ marginRight: "30px" }}>
                <FontAwesomeIcon icon={faInbox} />
              </button>
              <button>
                <FontAwesomeIcon icon={faAddressBook} />
              </button>
            </div>
            <div className="button-row">
              <button style={{ marginRight: "30px" }}>
                <FontAwesomeIcon icon={faComment} />
              </button>
              <button>
                <FontAwesomeIcon icon={faCalendarDays} />
              </button>
            </div>
            <div className="button-row">
              <button style={{ marginRight: "30px" }}>
                <FontAwesomeIcon icon={faLandmark} />
              </button>
              <button onClick={goToFormLayout}>
                <FontAwesomeIcon icon={faUsers} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

