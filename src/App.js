import React from "react";
import Dashboard from "./components/Dashboard"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import {PrivateRoute} from "./components/PrivateRoute";
import {Login} from "./components/pages/login/Login";
const useStyles = makeStyles((theme)=>({
  root: {
    display: "flex",
  }
}))


const App = () => {
  const classes = useStyles()
  return (
    <Router>
      <AuthProvider>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <PrivateRoute path= "/" to="/login" component={Dashboard}> 
           </PrivateRoute>
          </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App
