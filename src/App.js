import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {Navbar} from "./components/pages/core/Navbar"
import {NavDrawer} from "./components/pages/core/NavDrawer"
import {Canvas} from "./components/pages/core/Canvas"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  root: {
    display: "flex",
  }
}))


const App = () => {
  const classes = useStyles()
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar/>

          <NavDrawer/>
        <Canvas/>
      </div>
    </Router>
  );
}

export default App
