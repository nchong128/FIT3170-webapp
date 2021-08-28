import React, { useEffect, useState } from "react";

import { Fade, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Tabs from "../../Tabs";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { firestore } from "../../../firebase";
import { Link } from "react-router-dom";
import { UpdateProfileForm } from "./UpdateProfileForm";
import useForm from "../../../hooks/useForm";

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

const FORM_ID = "updateProfileForm";

const DoctorProfile = (props) => {
    const location = useLocation();

    const { currentUser } = useAuth();

    const classes = useStyles();

    // Start with empty doctor profile with no info
    const [doctorProfileInfo, setDoctorProfileInfo] = useState({});

    const [error, setError] = useState('');

    // flag to signal when edit page is shown
    const [editMode, setEditMode] = useState(false);

    // callback function for form submission
    const updateProfile = async () => {
        try {
            // fetch doctor profile from firestore
            await firestore.collection("doctors").doc(currentUser.uid).set({
                givenName: updateProfileInputs.givenName,
                familyName: updateProfileInputs.familyName,
                email: updateProfileInputs.email,
                dob: new Date(updateProfileInputs.dob),
                gender: updateProfileInputs.gender,
                placeOfPractice: updateProfileInputs.placeOfPractice
            });

            setDoctorProfileInfo({
                givenName: updateProfileInputs.givenName,
                familyName: updateProfileInputs.familyName,
                email: updateProfileInputs.email,
                dob: updateProfileInputs.dob,
                gender: updateProfileInputs.gender,
                placeOfPractice: updateProfileInputs.placeOfPractice
            });

            // change back to view doctor profile
            setEditMode(false);

            alert(`User profile successfully updated`);
        } catch (e) {
            console.log(e);
            alert(`Update failed: ${e}`);
        }
    }

    const {
        setInputs: setUpdateProfileInputs,
        inputs: updateProfileInputs,
        handleInputChange: updateProfileHandleInputChange,
        handleCheckboxChange: updateProfileHandleCheckboxChange,
        handleSubmit: updateProfileHandleSubmit
    } = useForm(updateProfile);

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
        // Used to set initial values of Update Profile form
        setUpdateProfileInputs({
            givenName: userData.givenName,
            familyName: userData.familyName,
            dob: userData.dob.toDate().toISOString().substring(0, 10),
            email: userData.email,
            gender: userData.gender,
            placeOfPractice: userData.placeOfPractice

        });
    }, []);


    // Fields for display profile table
    const fields = [
        { field: "givenName", title: "Given Name" },
        { field: "familyName", title: "Family Name" },
        { field: "dob", title: "Date of Birth" },
        { field: "email", title: "Email" },
        { field: "gender", title: "Gender" },
        { field: "placeOfPractice", title: "Place of Practice" }
    ];

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
                                    {editMode ? <EditProfileButtons
                                        classes={classes}
                                        onClick={() => setEditMode(false)} /> :
                                        <UpdateProfileButton
                                            onClick={() => setEditMode(true)} />}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {editMode ? <UpdateProfileForm
                                classes={classes}
                                handleSubmitWithCleanup={updateProfileHandleSubmit}
                                handleInputChange={updateProfileHandleInputChange}
                                handleCheckboxChange={updateProfileHandleCheckboxChange}
                                inputs={updateProfileInputs}
                                setError={setError}
                                formId={FORM_ID} /> :
                                <ProfileTable
                                    fields={fields}
                                    doctorProfileInfo={doctorProfileInfo} />}
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

const UpdateProfileButton = (props) => {
    return <Button
        onClick={props.onClick}
        display="inline" style={{
            float: "left", backgroundColor: "#6200EE",
            color: "#FFFFFF",
        }}>
        Edit Profile
    </Button>;
}

const EditProfileButtons = (props) => {
    return <div style={{float: "right"}}><Button
        onClick={props.onClick}
    >
        Cancel
    </Button>
        <Button
            type="submit"
            form={FORM_ID}
            style={{
                backgroundColor: "#6200EE",
                color: "#FFFFFF",
            }}
            variant="contained"
            className={props.classes.submit}
        >
            Save
        </Button></div>
}

export default DoctorProfile;