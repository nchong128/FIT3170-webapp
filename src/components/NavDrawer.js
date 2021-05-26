import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const NavDrawer = () => {
  const classes = useStyles();
  const [patientOpen, setPatientOpen] = React.useState(true);
  const [profileOpen, setProfileOpen] = React.useState(true);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => setPatientOpen(!patientOpen)}>
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Patients" />
            {patientOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={patientOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/patients"
                className={classes.nested}
              >
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary="My Patients" />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/patient/add"
                className={classes.nested}
              >
                <ListItemIcon>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Patients" />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/patient/alerts"
                className={classes.nested}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Alerts" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => setProfileOpen(!profileOpen)}
            component={Link}
            to="/profile"
          >
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Doctor" />
            {profileOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={profileOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/doctor/profile"
                className={classes.nested}
              >
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/doctor/profile/update"
                className={classes.nested}
              >
                <ListItemIcon>
                  <SystemUpdateAltIcon />
                </ListItemIcon>
                <ListItemText primary="Update Profile" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    </Drawer>
  );
};
