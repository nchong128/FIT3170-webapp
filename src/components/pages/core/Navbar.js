import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#6200EE",
        fontWeight: "bold"
    },
    icon: {
      marginRight: "0.8rem",
      color: "red"
    }
}
))

export const Navbar = () => {
    const classes = useStyles();

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
                justify="space-between" // Add it here :)
                container >
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
            <Box display="flex" alignItems="center">
              <FavoriteIcon className={classes.icon}/>
              <Typography variant="h6" noWrap>
                Heartsight
              </Typography>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    )
}
