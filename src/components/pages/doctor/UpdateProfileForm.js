import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import { TextField, Paper } from "@material-ui/core";

export const UpdateProfileForm = (props) => {
    return (
        <form id={props.formId} className={props.classes.form} noValidate onSubmit={props.handleSubmitWithCleanup}>

        <Grid container spacing={3}>
        <Grid item xs={6}>
                <Typography>
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
                            margin="normal"
                            required
                            fullWidth
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
