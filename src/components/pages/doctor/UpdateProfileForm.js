import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import { TextField, Paper } from "@material-ui/core";

export const UpdateProfileForm = (props) => {
    return (
        <form id={props.formId} className={props.classes.form} noValidate onSubmit={props.handleSubmitWithCleanup}>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography >
                        Given Name:

                    </Typography>

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        onChange={props.handleInputChange}
                        value={props.inputs.givenName}
                        name="givenName"
                        className={props.classes.textfield}
                        variant="outlined"
                        id="givenName"
                        autoComplete="givenName"
                        fullWidth
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }} />

                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Family Name:

                    </Typography>

                </Grid>
                <Grid item xs={6}>
                    <TextField

                        required

                        onChange={props.handleInputChange}
                        value={props.inputs.familyName}
                        fullWidth
                        size="small"
                        name="familyName"
                        className={props.classes.textfield}
                        variant="outlined"
                        id="familyName"
                        autoComplete="familyName"

                        InputLabelProps={{
                            shrink: true,
                        }} />

                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Date of Birth:

                    </Typography>

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        onChange={props.handleInputChange}
                        value={props.inputs.dob}
                        name="dob"
                        type="date"
                        className={props.classes.textfield}
                        variant="outlined"
                        id="dob"
                        InputLabelProps={{
                            shrink: true,
                        }} />

                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Gender:

                    </Typography>

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        onChange={props.handleInputChange}
                        value={props.inputs.gender}
                        fullWidth
                        size="small"
                        name="gender"
                        className={props.classes.textfield}
                        variant="outlined"
                        id="gender"
                        autoComplete="gender"

                        InputLabelProps={{
                            shrink: true,
                        }} />

                </Grid>



                <Grid item xs={6}>
                    <Typography>
                        Place of Practice:

                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        onChange={props.handleInputChange}
                        value={props.inputs.placeOfPractice}
                        fullWidth
                        size="small"
                        name="placeOfPractice"
                        className={props.classes.placeOfPractice}
                        variant="outlined"
                        id="placeOfPractice"
                        autoComplete="placeOfPractice"

                        InputLabelProps={{
                            shrink: true,
                        }} />
                </Grid>

            </Grid>
        </form>
    );
};
