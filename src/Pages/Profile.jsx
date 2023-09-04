import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../img/ProfilePic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faAddressBook,
  faUsers,
  faCalendarDays,
  faLandmark,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Profile.css";

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
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <img
              src={ProfilePic || ProfilePic}
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-picture"
            />
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
              <div className="icon-with-description">
                <button>
                  <FontAwesomeIcon icon={faInbox} />
                </button>
                <span>Inbox</span>
              </div>
              <div className="icon-with-description">
                <button>
                  <FontAwesomeIcon icon={faAddressBook} />
                </button>
                <span>Contact</span>
              </div>
            </div>
            <div className="button-row">
              <div className="icon-with-description">
                <button>
                  <FontAwesomeIcon icon={faComment} />
                </button>
                <span>Messenger</span>
              </div>
              <div className="icon-with-description">
                <button>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </button>
                <span>Time Off</span>
              </div>
            </div>
            <div className="button-row">
              <div className="icon-with-description">
                <button>
                  <FontAwesomeIcon icon={faLandmark} />
                </button>
                <span>Accounts</span>
              </div>
              <div className="icon-with-description">
                <button onClick={goToFormLayout}>
                  <FontAwesomeIcon icon={faUsers} />
                </button>
                <span>Group Benefits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
