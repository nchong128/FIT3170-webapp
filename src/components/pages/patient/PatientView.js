import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PatientTabs from "./PatientTabs";
import { useLocation } from "react-router-dom";
import { firestore } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useEffect, useState } from "react";


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

    // This is the patient data
    const data = location.state;
  
    const [patientInfo, setPatientInfo] = useState({});
    
    const tabHeadings = ["Alerts", "ECG History", "Heartrate"];
    const fields = [
        { field: "email", title: "Email" },
        { field: "height", title: "Height (cm)" },
        { field: "gender", title: "Gender" },
        { field: "dateOfBirth", title: "DOB" },
        { field: "maritalStatus", title: "Marital Status" },
        { field: "weight", title: "Weight (kg)" },
        
    ];
    useEffect(async () => {
        // Retrieve readings for the date given
        const patientDataDoc = await firestore.collection("patients").doc(data.id).get();
        console.log(patientDataDoc)
        const patientData = patientDataDoc.data();
        console.log(patientData)
        setPatientInfo({
            dateOfBirth: patientData.dateOfBirth.toDate().toISOString().substring(0, 10),
            email: patientData.email,
            gender: patientData.gender,
            height: patientData.height,
            maritalStatus: patientData.maritalStatus,
            weight: patientData.weight
        });
      }, []);
    

    const classes = useStyles();
    const { currentUser } = useAuth();
    const history = useHistory();
    
    const unlinkPatient = () =>  {
        // remove patient from current doctor's patient list 
        firestore.collection(`/doctors/${currentUser.uid}/linkedPatients`).doc(data.id).delete().then(
            () => {
                // remove current doctor's id from patient's list
                let patientRef = firestore.collection("/patients").doc(data.id)
                patientRef.update({
                    doctors: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                }).then(() => {
                    // send user back to patient list page
                    history.push({ pathname: "/patients", state: {} });
                    console.log("deleted")
                })
                        
            }
    
        )     

    };
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
                                        {data["givenName"]} {data["familyName"]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        style={{ backgroundColor: "red", color: "white" }}
                                        onClick={() => unlinkPatient()}
                                    >
                                        Unlink Patient
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
                                            {field.title}: {patientInfo[field.field]}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <div style={{ height: 20 }}></div>
                <PatientTabs headers={tabHeadings} patientData={data} />
            </div>
        </>
    );
};

export default PatientLister;
