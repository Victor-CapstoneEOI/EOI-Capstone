import React, { useState } from "react";
import { Drawer, AppBar, Toolbar, CssBaseline, Typography, List, ListItem, ListItemText, Container } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faAddressBook,
  faUsers,
  faCalendarDays,
  faLandmark,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../img/ProfilePic.png";
import "../Styles/Profile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className="profile-container">
          <div className="profile-info">
            <img
              src={ProfilePic}
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-picture"
            />
          </div>
          <div className="name-info">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <p>{user.email}</p>
            <p>Software Developer</p>
          </div>
        </div>
        <List>
          {['Dashboard', 'Customers', 'Products', 'Orders'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Container>
          <Typography variant="h4">
            Welcome to your Dashboard
          </Typography>
          <Typography paragraph>
            Your main content goes here.
          </Typography>
        </Container>
      </main>
    </div>
  );
};

export default Profile;
