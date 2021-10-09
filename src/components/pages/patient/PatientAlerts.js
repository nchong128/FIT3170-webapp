import React from 'react'
import Table from "../../PatientAlertsTable";
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

const PatientAlerts = () => {
  const alertHeader = "2 new alerts since 13 Aug 2021";
  // const classes = useStyles();
  return (
    <>
      <h1>Alerts</h1>
      <Table/>
    </>
  );
};

export default PatientAlerts