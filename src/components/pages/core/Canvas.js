import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PatientLister from "../patient/PatientLister";
import PatientAdd from "../patient/PatientAdd";
import DoctorProfile from "../doctor/DoctorProfile";
import DoctorUpdate from "../doctor/DoctorUpdate";
import Dashboard from "../dashboard/Dashboard";
import { makeStyles } from "@material-ui/core";
import PatientAlerts from "../patient/PatientAlerts";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      }
}));


export const Canvas = () => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
        <Toolbar />
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/patient">
              <PatientLister />
            </Route>
            <Route exact path="/patient/add">
              <PatientAdd />
            </Route>
            <Route exact path="/patient/alerts">
              <PatientAlerts />
            </Route>
            <Route exact path="/doctor/profile">
              <DoctorProfile />
            </Route>
            <Route exact path="/doctor/profile/update">
              <DoctorUpdate />
            </Route>
          </Switch>
      </main>
    )
}
