import React from "react";
import Table from "../../PatientAlertsTable";
import { useAuth, pullAlerts } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { firestore } from "../../../firebase";
import dummyData from "../../../dummyData/dummyAlertData";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     height: "100%",
//   },
// }));

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}

const PatientAlerts = () => {
    const alertHeader = "2 new alerts since 13 Aug 2021";

    const { currentUser, pullAlerts } = useAuth();
    var alerts;

    useEffect(async () => {
        alerts = await pullAlerts();
        // [HERE] : alerts contains AlertData with respect to the format done in dummyAlertData.js
        await timeout(1000); // Value in milliseconds
        console.log(alerts.length);
        
    }, [])

    


  // const classes = useStyles();
  return (
    <>
      <h1>Alerts</h1>
          <Table />
    </>
  );
};

export default PatientAlerts