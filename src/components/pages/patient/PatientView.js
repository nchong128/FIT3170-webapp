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

const PatientLister = (props) => {
  const location = useLocation();
  const data = location.state;
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
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">Patient</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {data["givenName"]} {data["surname"]}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ backgroundColor: "#6200EE", color: "white" }}
                  >
                    See Profile
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Grid container spacing={3} justify="center">
                {fields.map((field, key) => (
                  <Grid key={key} item xs={6}>
                    <Typography>
                      {field.title}: {data[field.field]}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ height: 20 }}></div>
        <Tabs headers={tabHeadings} />
      </div>
    </>
  );
};

export default PatientLister;
