import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Tabs from "../../Tabs";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { firestore } from "../../../firebase";
import { Link } from "react-router-dom";

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

const getDoctorProfileInfoQuery = (currentUser) => {

}

const DoctorProfile = (props) => {
    const location = useLocation();

    const { currentUser } = useAuth();

    // Start with empty doctor profile with no info
    const [doctorProfileInfo, setDoctorProfileInfo] = useState({});

    // On component mount/unmount, retrieve user information from firebase and set to empty doctor profile
    useEffect(async () => {
        // Retrieve user information using currentUser
        const userDataDoc = await firestore.collection("doctors").doc(currentUser.uid).get();
        console.log(userDataDoc)
        const userData = userDataDoc.data();
        console.log(userData)
        setDoctorProfileInfo({
            givenName: userData.givenName,
            familyName: userData.familyName,
            dob: userData.dob.toDate().toISOString().substring(0, 10),
            email: userData.email,
            gender: userData.gender,
            placeOfPractice: userData.placeOfPractice
        });
    }, []);


    const tabHeadings = ["Alerts", "ECG History", "Heartrate"];
    const fields = [
        { field: "givenName", title: "Given Name" },
        { field: "familyName", title: "Family Name" },
        { field: "dob", title: "Date of Birth" },
        { field: "email", title: "Email" },
        { field: "gender", title: "Gender" },
        { field: "placeOfPractice", title: "Place of Practice" }
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
                                    <Typography variant="h5" display="inline" style={{ float: "left" }}>Doctor</Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography display="inline" style={{ float: "left" }}>
                                        {doctorProfileInfo["givenName"]} {doctorProfileInfo["familyName"]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <UpdateProfileButton />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <ProfileTable fields={fields} doctorProfileInfo={doctorProfileInfo} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

const ProfileTable = (props) => {
    return <Grid container spacing={3} justify="center">
        {props.fields.map((field, key) => (
            <Grid key={key} item xs={12}>
                <Typography>
                    {field.title}: {props.doctorProfileInfo[field.field]}
                </Typography>
            </Grid>
        ))}
    </Grid>;
}

export default DoctorProfile;

const UpdateProfileButton = () => {
    return <Button
        button
        component={Link}
        to="/doctor/profile/update"
        display="inline" style={{
            float: "left", backgroundColor: "#5784FF",
            color: "#FFFFFF",
        }}>
        Edit Profile
    </Button>;
}
