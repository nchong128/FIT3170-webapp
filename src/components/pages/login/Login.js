import {useState} from "react"
import {useHistory} from 'react-router-dom'
import {useAuth} from "../../../contexts/AuthContext"
import {Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from '@material-ui/lab/Alert';
import useForm from "../../../hooks/useForm";
import {firestore} from "../../../firebase";
import Image from "../../../Heartsight_Landing_Image.png";
// Yes this image is freely usable -- 
// Link here: https://images.unsplash.com/photo-1527628173875-3c7bfd28ad78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1

// TODO: Add diagonal line and Heartsight
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        // background: [
        //     '-webkit-linear-gradient(rgba(135, 60, 255, 1), rgba(135, 60, 255, 0.0) 0%)',
        //     '-webkit-linear-gradient(-45deg, rgba(120, 155, 255, 0.9) 45%, rgba(55, 230, 235, 1) 0%)'
        // ]
    },
    image: {
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paperbase: {
        backgroundColor: "#6200EE",
        color: "#FFFFFF",
    },
    paper: {
        margin: theme.spacing(19, 15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
        // color: "#FFFFFF",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textfield: {
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF",
        opacity: 1,
        borderRadius: 5
    }
}));

const LoginForm = (props) => {
    return (
        <form className={props.classes.form} noValidate onSubmit={props.handleSubmitWithCleanup}>
            <TextField
                margin="normal"
                required
                fullWidth
                onChange={props.handleInputChange}
                value={props.inputs.email}
                name="email"
                className={props.classes.textfield}
                variant="outlined"
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                margin="normal"
                fullWidth
                className={props.classes.textfield}
                variant="outlined"
                onChange={props.handleInputChange}
                required
                value={props.inputs.password}
                name="password"
                placeholder="Enter your password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <Grid
                container
                // direction="row"
                // justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name={"rememberMe"}
                                checked={props.inputs.rememberMe}
                                onChange={props.handleCheckboxChange}
                                style={{
                                    color: "#FFFFFF",
                                }}
                            />
                        }
                        label="Remember me"
                    />
                </Grid>
                <Grid
                    item
                    styles={{
                        textAlign: "right",
                    }}
                >
                    <Link
                        href="#"
                        variant="body1"
                        style={{
                            color: "#FFFFFF",
                        }}
                        onClick={props.showRecoverPassword}
                    >
                        Recover Password
                    </Link>
                </Grid>
            </Grid>


            <Grid
                container
                // direction="row"
                // justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs>
                    <Link
                        href="#"
                        variant="body1"
                        style={{
                            color: "#FFFFFF",
                        }}
                        onClick={props.showSignupForm}
                    >
                        Create account
                    </Link>
                </Grid>
                <Grid
                    item
                    // styles={{
                    //     textAlign: "right",
                    // }}
                >
                    <Button
                        type="submit"
                        fullWidth
                        style={{
                            backgroundColor: "#5784FF",
                            color: "#FFFFFF",
                        }}
                        variant="contained"
                        className={props.classes.submit}
                    >
                        Sign In
                    </Button>
                </Grid>

            </Grid>
        </form>
    );
}

const SignupForm = (props) => {
    return (
        <form className={props.classes.form} noValidate onSubmit={props.handleSubmitWithCleanup}>
            <TextField
                margin="normal"
                required
                fullWidth
                onChange={props.handleInputChange}
                value={props.inputs.givenName}
                name="givenName"
                className={props.classes.textfield}
                variant="outlined"
                id="givenName"
                placeholder="Enter your given name"
                autoComplete="givenName"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                onChange={props.handleInputChange}
                value={props.inputs.familyName}
                name="familyName"
                className={props.classes.textfield}
                variant="outlined"
                id="familyName"
                placeholder="Enter your family name"
                autoComplete="familyName"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                onChange={props.handleInputChange}
                value={props.inputs.email}
                name="email"
                className={props.classes.textfield}
                variant="outlined"
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
                InputLabelProps={{
                    shrink: true,
                }}
            />

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
                }}
            />

            <TextField
                margin="normal"
                fullWidth
                className={props.classes.textfield}
                variant="outlined"
                onChange={props.handleInputChange}
                required
                value={props.inputs.password}
                name="password"
                placeholder="Enter your password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                margin="normal"
                fullWidth
                className={props.classes.textfield}
                variant="outlined"
                onChange={props.handleInputChange}
                required
                value={props.inputs.confirmPassword}
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
                id="confirmPassword"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <Button
                type="submit"
                fullWidth
                style={{
                    backgroundColor: "#5784FF",
                    color: "#FFFFFF",
                }}
                variant="contained"
                className={props.classes.submit}
            >
                Create Account
            </Button>

        </form>
    );
}

const ForgetPasswordForm = (props) => {
    return (
        <form className={props.classes.form} noValidate onSubmit={props.sendPwResetEmail}>
            <TextField
                margin="normal"
                required
                fullWidth
                onChange={props.handleInputChange}
                value={props.inputs.email}
                name="email"
                className={props.classes.textfield}
                variant="outlined"
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
                InputLabelProps={{
                    shrink: true
                }}
            />

            <Button
                type="submit"
                fullWidth
                style={{
                    backgroundColor: "#5784FF",
                    color: "#FFFFFF",
                }}
                variant="contained"
                className={props.classes.submit}
            >
                Recover Password
            </Button>
        </form>
    );
}

export const Login = () => {
    const {login, currentUser, sendPasswordResetEmail, signUp } = useAuth();
    const loginWithCredentials = () => {
        return login(inputs.email, inputs.password);
    }
    const {inputs, handleInputChange,handleCheckboxChange, handleSubmit} = useForm(loginWithCredentials);

    const signUpWithDetails = async () => {
        try {
            setError('');
            await signUp(signUpInputs.email, signUpInputs.password, {
                givenName: signUpInputs.givenName,
                familyName: signUpInputs.familyName,
                email: signUpInputs.email,
                dob: new Date(signUpInputs.dob)
            });
        } catch (e) {
            /*
            auth/email-already-in-use
            Thrown if there already exists an account with the given email address.
            auth/invalid-email
            Thrown if the email address is not valid.
            auth/operation-not-allowed
            Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
            auth/weak-password
            Thrown if the password is not strong enough
             */
            // Handle Errors here.
            var errorCode = e.code;
            var errorMessage = e.message;
            if (errorCode === 'auth/email-already-in-use') {
                setError("Email already in use.");
            } else if (errorCode === "auth/invalid-email") {
                setError("An invalid email was used.");
            } else if (errorCode === "auth/weak-password") {
                setError("Please sign up with a stronger password.");
            } else {
                setError(`Failed to sign up. Error message ${errorMessage}.`);
            }
            return;
        }
        showLoginForm();
    }
    const {
        inputs: signUpInputs,
        handleInputChange: signUpHandleInputChange,
        handleCheckboxChange: signUpHandleCheckboxChange,
        handleSubmit: signUpHandleSubmit
    } = useForm(signUpWithDetails);

    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    /*
        0 = LoginForm
        1 = ForgetPasswordForm
        2 = SignupForm
     */
    const [formShown, setFormShown] = useState(0);

    const history = useHistory();
    const classes = useStyles();

    const showLoginForm = () => {
        setFormShown(0);
    };

    const showRecoverPassword = () => {
        setFormShown(1);
    };

    const showSignupForm = () => {
        setFormShown(2);
    }


    // Clean up and set loading before attempting to login
    async function handleSubmitWithCleanup(event) {
        const cleanUp = () => {setLoading(false)};

        try {
            setError('');
            setLoading(true);
            await handleSubmit(event);
            // Check that user is logged in.
            console.log(currentUser);

        } catch(e) {
            // Handle Errors here.
            var errorCode = e.code;
            var errorMessage = e.message;
            if (errorCode === 'auth/wrong-password') {
                setError("Wrong password");
            } else if (errorCode === "auth/invalid-email") {
                setError("An invalid email was used.");
            } else {
                setError('Failed to log in. Check if you have used the correct credentials.');
            }
            return cleanUp();
        }

        let res = cleanUp();

        //  Only proceed if user is successfully logged in
        history.push('/patients');
        return res;
    }

    const sendPwResetEmail = async (event) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(inputs.email);
        } catch (e) {
            // Handle Errors here.
            var errorCode = e.code;
            var errorMessage = e.message;
            if (errorCode === 'auth/wrong-password') {
                setError("Wrong password");
            } else if (errorCode === "auth/invalid-email") {
                setError("An invalid email was used.");
            } else {
                setError('Failed to log in. Check if you have used the correct credentials.');
            }
        }
        setInfo("Your password has been reset. Please check your email.");
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={false} md={5} className={classes.image} />
            <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square className={classes.paperbase}>
                <div className={classes.paper}>
                    {
                        error && (<Alert severity="error">{error}</Alert>)
                    }

                    {
                        info && (<Alert severity="info">{info}</Alert>)
                    }

                    { formShown === 0 &&
                        <LoginForm
                            classes={classes}
                            handleSubmitWithCleanup={handleSubmitWithCleanup}
                            handleInputChange={handleInputChange}
                            handleCheckboxChange={handleCheckboxChange}
                            inputs={inputs}
                            showRecoverPassword={showRecoverPassword}
                            showSignupForm={showSignupForm}
                        />
                    }

                    { formShown === 1 &&
                        <ForgetPasswordForm
                            classes={classes}
                            handleSubmitWithCleanup={handleSubmitWithCleanup}
                            handleInputChange={handleInputChange}
                            handleCheckboxChange={handleCheckboxChange}
                            inputs={inputs}
                            setError={setError}
                            sendPwResetEmail={sendPwResetEmail}
                        />
                    }

                    { formShown === 2 &&
                        <SignupForm
                            classes={classes}
                            handleSubmitWithCleanup={signUpHandleSubmit}
                            handleInputChange={signUpHandleInputChange}
                            handleCheckboxChange={signUpHandleCheckboxChange}
                            inputs={signUpInputs}
                            setError={setError}
                        />
                    }



                </div>
            </Grid>
        </Grid>
    )
}
