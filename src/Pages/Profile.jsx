import React from 'react';
import SideProfile from '../Components/SideProfile'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faAddressBook,
  faRectangleList,
  faCalendarDays,
  faIdCardClip,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import '../Styles/Profile.css'; // Make sure this path is correct

const Profile = () => {
  const navigate = useNavigate();

  const goToFormLayout = () => {
    navigate("/formlayout");
  };

  return (
    <div className='SProfile'>
      <SideProfile />
      <div className='Name'>
        <div className='TransparentBox'>
          <div className='buttons'>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon className='fa-icon' icon={faInbox} />
                <div className='description'>Inbox</div>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon className='fa-icon' icon={faAddressBook} />
                <div className='description'>Contacts</div>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon className='fa-icon' icon={faComment} />
                <div className='description'>Messenger</div>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon className='fa-icon' icon={faCalendarDays} />
                <div className='description'>Calendar</div>
              </div>
            </button>
            <button className='square-button'>
              <div>
                <FontAwesomeIcon className='fa-icon' icon={faIdCardClip} />
                <div className='description'>Medical Card</div>
              </div>
            </button>
            <button onClick={goToFormLayout} className='square-button'>
              <div>
                <FontAwesomeIcon className='fa-icon' icon={faRectangleList} />
                <div className='description'>Evidence of Insurability Form</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
