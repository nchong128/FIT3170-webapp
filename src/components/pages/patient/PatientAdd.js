/*
Name: Hao Jun, Heng
Date: 22/10/2021

The page responsible for displaying the QR invite so that doctors are able to add patients.
*/

import React from "react";
import { makeStyles } from "@material-ui/core"
import { CircularProgress } from "@material-ui/core"
import QRCode from 'qrcode';
import { useEffect, useState } from "react";
import { useAuth, createInvite } from "../../../contexts/AuthContext";
import { firestore } from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  root: {
    display: 'flex',
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: "-64px"
  },
  header: {
    textAlign: "center",
    fontSize: "3rem"
  },
  qrCode: {
    width: "18rem"
  },
  sub: {
    fontSize: "1.75rem"
  },
  spinner: {
    height: "60px",
    width: "60px"
  }
}));

/**
 * Gets the invite id and doctor id and embeds them into a QR code.
 * */
const PatientAdd = () => {
    const classes = useStyles();
    const { currentUser, createInvite } = useAuth();
    const [src, setSrc] = useState('');

    useEffect(async () => {
        // Retrieve doctorId and inviteId 
        const inviteId = await createInvite();
        const doctorId = currentUser.uid;

        const qrtext = `${inviteId}-${doctorId}`;
        QRCode.toDataURL(qrtext).then(setSrc);
    }, [])

    // QR code displayed as an image
    return (
        <div className={classes.root}>
            <h1 className={classes.header}>
                Patient Link QR Code
      </h1>
            <img className={classes.qrCode} src={src} >
            </img>
            <p className={classes.sub}>Waiting for a patient to scan the code...</p>
            <CircularProgress className={classes.spinner} color="secondary" />
        </div>
  )
};

export default PatientAdd;
