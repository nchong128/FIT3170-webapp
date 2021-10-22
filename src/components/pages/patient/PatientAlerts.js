/*
Name: Hao Jun, Heng & Richard, Liu
Date: 22/10/2021

The page responsible for displaying the patient alerts to the doctor
*/

import React from "react";
import Table from "../../PatientAlertsTable";
import { useAuth, pullAlerts } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { firestore } from "../../../firebase";
import dummyData from "../../../dummyData/dummyAlertData";
import TextField from '@mui/material/TextField';

/**
 * Delays time in real world milliseconds
 * 
 * @param {int} delay - The amount of time to delay in milliseconds
 */
function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}
/**
 * Takes the alert data pulled from the database and displays it neatly into a table
 * */
const PatientAlerts = () => {
  // The format of an alert object
  const header = [
    { field: "alert" },
    { field: "givenName" },
    { field: "surName" },
    { field: "id" },
    { field: "time" },
    ];

  // Pulling the data from the database
  const [tableData, setTableData] = useState([]);
  const { pullAlerts } = useAuth();
  var alerts;
  useEffect(async () => {
    alerts = await pullAlerts();
    await timeout(1000); // Value in milliseconds
    setTableData(alerts);
  }, []);

  // Displays the data into a table
  return (
    <>
      <h1>Alerts</h1>
      <Table header={header} rows={tableData} onClick={true} />
    </>
  );
};

<TextField
    margin="normal"
    required
    fullWidth
    name="historyDate"
    type="date"
    // className={classes.textfield}
    variant="outlined"
    id="historyDate"
    InputLabelProps={{
        shrink: true,
}}
/>
export default PatientAlerts