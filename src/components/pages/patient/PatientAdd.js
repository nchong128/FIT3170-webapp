import React from "react";
import {makeStyles} from "@material-ui/core"
import {CircularProgress} from "@material-ui/core"
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
  return (
    <div className={classes.root}>
      <h1 className={classes.header}>
      Patient Link QR Code 
      </h1>
      <img className={classes.qrCode} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1024px-QR_code_for_mobile_English_Wikipedia.svg.png">
      </img>
      <p className={classes.sub}>Waiting for a patient to scan the code...</p>
      <CircularProgress className={classes.spinner} color="secondary"/>
  </div>
  )


  

};

export default PatientAdd;
