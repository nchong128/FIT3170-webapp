import React from "react";
import Table from "../../PatientAlertsTable";
import { useAuth, pullAlerts } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { firestore } from "../../../firebase";
import dummyData from "../../../dummyData/dummyAlertData";

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}

const PatientAlerts = () => {
  const header = [
    { field: "alert" },
    { field: "givenName" },
    { field: "surName" },
    { field: "id" },
    { field: "time" },
  ];

  const [tableData, setTableData] = useState([]);
  const { pullAlerts } = useAuth();
  var alerts;
  useEffect(async () => {
    alerts = await pullAlerts();
    // [HERE] : alerts contains AlertData with respect to the format done in dummyAlertData.js
    await timeout(1000); // Value in milliseconds
    setTableData(alerts);
  }, []);

  return (
    <>
      <h1>Alerts</h1>
      <Table header={header} rows={tableData} onClick={true} />
    </>
  );
};

export default PatientAlerts