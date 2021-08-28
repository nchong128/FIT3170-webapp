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
import useForm from "../../../hooks/useForm";
import { Link } from "react-router-dom";
import { UpdateProfileForm } from "./UpdateProfileForm";

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

const FORM_ID = "updateProfileForm";


const DoctorProfile = (props) => {
    const location = useLocation();

    const { currentUser } = useAuth();
    
    const classes = useStyles();

    const [error, setError] = useState('');
    // callback function for form submission
    const updateProfile = async () => {
        await firestore.collection("doctors").doc(currentUser.uid).set({
            givenName: updateProfileInputs.givenName,
            familyName: updateProfileInputs.familyName,
            email: updateProfileInputs.email,
            dob: new Date(updateProfileInputs.dob),
            gender: updateProfileInputs.gender,
            placeOfPractice: updateProfileInputs.placeOfPractice
        });
        alert(`User profile successfully updated`);
    }

    const {
        setInputs: setUpdateProfileInputs,
        inputs: updateProfileInputs,
        handleInputChange: updateProfileHandleInputChange,
        handleCheckboxChange: updateProfileHandleCheckboxChange,
        handleSubmit: updateProfileHandleSubmit
    } = useForm(updateProfile);

    const [initialDoctorProfile, setInitialDoctorProfile] = useState({});

    // On component mount/unmount, retrieve user information from firebase and set to empty doctor profile
    useEffect(async () => {
        // Retrieve user information using currentUser
        const userDataDoc = await firestore.collection("doctors").doc(currentUser.uid).get();
        console.log(userDataDoc);
        const userData = userDataDoc.data();
        console.log(userData);
        setInitialDoctorProfile({
            givenName: userData.givenName,
            familyName: userData.familyName,
            dob: userData.dob.toDate().toISOString().substring(0, 10),
            email: userData.email,
            gender: userData.gender,
            placeOfPractice: userData.placeOfPractice

        });
        setUpdateProfileInputs({
            givenName: userData.givenName,
            familyName: userData.familyName,
            dob: userData.dob.toDate().toISOString().substring(0, 10),
            email: userData.email,
            gender: userData.gender,
            placeOfPractice: userData.placeOfPractice

        });
    }, []);

 

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
                                    {initialDoctorProfile && <Typography display="inline" style={{ float: "left" }}>
                                        {initialDoctorProfile["givenName"]} {initialDoctorProfile["familyName"]}
                                    </Typography>}

                                </Grid>
                                <Grid item xs={12} >
                                    <Button
                                        button
                                        component={Link}
                                        to="/doctor/profile"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        form={FORM_ID}
                                        style={{
                                            backgroundColor: "#5784FF",
                                            color: "#FFFFFF",
                                        }}
                                        variant="contained"
                                        className={classes.submit}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={5} justify="center">

                                <UpdateProfileForm
                                    classes={classes}
                                    handleSubmitWithCleanup={updateProfileHandleSubmit}
                                    handleInputChange={updateProfileHandleInputChange}
                                    handleCheckboxChange={updateProfileHandleCheckboxChange}
                                    inputs={updateProfileInputs}
                                    setError={setError}
                                    formId={FORM_ID}

                                />





                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>

    );
};




export default DoctorProfile;
