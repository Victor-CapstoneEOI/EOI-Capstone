import  { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Save, Help } from '@mui/icons-material';
import '../Styles/Sidebar.css'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleGetHelpClick = () => {
    window.location.href = "mailto:help@example.com?subject=Need Help&body=Please describe your issue here.";
  };

  return (
    <div>
      <button onClick={toggleSidebar}>
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>

      {showSidebar && (
        <div className="sidebar-container">
          {/* ... rest of your sidebar code */}
          <section>
            <ListItem className="sidebar-item">
              <ListItemIcon className="save-icon">
                <Save />
              </ListItemIcon>
              <ListItemText primary="Want to pick this up later? Save your progress and we'll send you a link so you can come back when you're ready" className="sidebar-text" />
            </ListItem>
            
            <div className="sidebar-button-container">
              <button className="sidebar-button">SAVE PROGRESS</button>
            </div>
            
            <ListItem className="sidebar-item">
              <ListItemIcon className="help-icon">
                <Help />
              </ListItemIcon>
              <ListItemText primary="Need help? Click here if you need assistance" className="sidebar-text" />
            </ListItem>
          </section>
          
          <div className="sidebar-button-container">
            <button className="sidebar-button" onClick={handleGetHelpClick}>GET HELP</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;