import React from 'react'
import {TextField} from "@material-ui/core";
const PatientAlerts = () => {
    return (
        <h1>Patient Alerts</h1>
    )
}

<TextField
    margin="normal"
    required
    fullWidth
    name="historyDate"
    type="date"
    // className={classes.textfield}
    variant="outlined"
    id="historyDate"
    InputLabelProps={{
        shrink: true,
}}
/>
export default PatientAlerts