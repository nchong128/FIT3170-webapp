import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Navbar} from "./Navbar"
import {NavDrawer} from "./NavDrawer"
import {Canvas} from "./Canvas"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  root: {
    display: "flex",
  }
}))
const Dashboard = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar/>
      <NavDrawer/>
      <Canvas/>
    </div>
  )
};

export default Dashboard;
