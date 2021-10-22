import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PatientLister from "./pages/patient/PatientLister";
import PatientAdd from "./pages/patient/PatientAdd";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorUpdate from "./pages/doctor/DoctorUpdate";
import DashboardAnalytics from "./pages/dashboard/DashboardAnayltics";
import { makeStyles } from "@material-ui/core";
import PatientAlerts from "./pages/patient/PatientAlerts";
import PatientView from "./pages/patient/PatientView";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Canvas = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar />
      <Switch>
        <Route exact path="/patients">
          <PatientLister />
        </Route>
        <Route exact path="/patients/patient">
          <PatientView />
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
  );
};
