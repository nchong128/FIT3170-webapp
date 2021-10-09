import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { DialogTitle } from "@material-ui/core";
import ECGLineGraph from "./ECGLineGraph";
import dummyECGData from "../../../dummyData/dummyECGData";
import dummyHeartRate from "../../../dummyData/dummyHeartRate";
import Table from "../../Table";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        height: 500,
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
      }}
    >
      {/* {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )} */}
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PatientTabs({ headers, patientData }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const alertHeader = [
    { field: "alertType", title: "Alert Type" },
    { field: "date", title: "Alert Date " },
  ];
  const alertData = [
    { alertType: "High Heart Rate", date: "01-04-2021" },
    { alertType: "Unusual ECG Pattern", date: "05-04-2021" },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          style={{ backgroundColor: "#6200EE" }}
        >
          {headers.map((title, key) => (
            <Tab key={key} label={title} {...a11yProps(key)} />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Table header={alertHeader} rows={alertData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ECGLineGraph title="ECG Reading" patientData={patientData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
    </div>
  );
}
