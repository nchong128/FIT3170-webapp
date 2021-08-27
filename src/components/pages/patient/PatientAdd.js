import React from "react";
import { makeStyles } from "@material-ui/core"
import { CircularProgress } from "@material-ui/core"
import QRCode from 'qrcode';
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
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

const PatientAdd = () => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const [src, setSrc] = useState('');

    useEffect(async () => {
        // Retrieve doctorId and inviteId using currentUser
        const inviteId = await firestore.collection("invites").doc(currentUser.inviteId).get();
        const doctorId = await firestore.collection("doctors").doc(currentUser.uid).get();
        const qrtext = `${inviteId}-${doctorId}`;
        QRCode.toDataURL(qrtext).then(setSrc);
    }, [])

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
