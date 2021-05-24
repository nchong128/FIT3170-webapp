import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#6200EE",
      }
}
))

export const Navbar = () => {
    const classes = useStyles();

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    )
}
