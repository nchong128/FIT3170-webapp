import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

export const UpdateProfileForm = (props) => {
    return (
        <form id={props.formId} className={props.classes.form} noValidate onSubmit={props.handleSubmitWithCleanup}>


            <Grid item>
                <Typography>
                    Given Name:
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
                </Typography>
                <Grid item>
                    <Typography>
                        Family Name:
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
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        DOB:
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
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Gender
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
                    </Typography>
                </Grid>
                {/* <Grid item>
            <Typography>
                Email:
                <TextField
                    required
                    onChange={props.handleInputChange}
                    value={props.inputs.email}
                    
                    name="email"
                    className={props.classes.email}
                    variant="outlined"
                    id="email"
                    autoComplete="email"
                    
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Typography>
        </Grid> */}
                <Grid item>
                    <Typography>
                        Place of Practice:
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
                    </Typography>
                </Grid>


            </Grid>
        </form>
    );
};
