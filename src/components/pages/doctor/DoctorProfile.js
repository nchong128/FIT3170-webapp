import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Tabs from "../../Tabs";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
}));

const DoctorProfile = (props) => {
  const location = useLocation();
  // const data = location.state;
  const data = {
    givenName: "Nick",
    surname: "Chong",
    gender: "Male",
    age: "21",
    email: "niccho@heartsight.com",
    phone: "398-6893-75",
    occupation: "Student",
    maritalStatus: "Single :(",
  };
  const tabHeadings = ["Alerts", "ECG History", "Heartrate"];
  const fields = [
    { field: "email", title: "Email" },
    { field: "occupation", title: "Occupation" },
    { field: "age", title: "Age" },
    { field: "gender", title: "Gender" },
    { field: "phone", title: "Phone" },
    { field: "maritalStatus", title: "Marital Status" },
  ];
  const classes = useStyles();
  return (
      <>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <AccountCircleIcon fontSize="large" />
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={12} >
                    <Typography variant="h5" display="inline" style={{float: "left"}}>Doctor</Typography>
                  </Grid>
                  <Grid item xs={12} >
                    <Typography display="inline" style={{float: "left"}}>
                      {data["givenName"]} {data["surname"]}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={3} justify="center">
                  {fields.map((field, key) => (
                      <Grid key={key} item xs={12}>
                        <Typography>
                          {field.title}: {data[field.field]}
                        </Typography>
                      </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
  );
};

export default DoctorProfile;
