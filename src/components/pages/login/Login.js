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
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        // backgroundColor: "#FFFFFF",
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

export const Login = () => {
    const {login, currentUser } = useAuth()
    const loginWithCredentials = () => {
        return login(inputs.email, inputs.password);
    }
    const {inputs, handleInputChange,handleCheckboxChange, handleSubmit} = useForm(loginWithCredentials);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const classes = useStyles();

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
            var errorCode = error.code;
            var errorMessage = error.message;
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
        history.push('/');
        return res;
    }

    // <button onClick={loginEmailPassword}>
    //     Test
    // </button>
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={false} md={5} className={classes.image} />
            <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square className={classes.paperbase}>
                <div className={classes.paper}>
                    {
                        error && (<Alert severity="error">{error}</Alert>)
                    }
                    <form className={classes.form} noValidate onSubmit={handleSubmitWithCleanup}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleInputChange}
                            value={inputs.email}
                            name="email"
                            className={classes.textfield}
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
                            className={classes.textfield}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                            value={inputs.password}
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
                                            checked={inputs.rememberMe}
                                            onChange={handleCheckboxChange}
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
                                >
                                    Recover Password
                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            style={{
                                backgroundColor: "#5784FF",
                                color: "#FFFFFF",
                            }}
                            variant="contained"
                            // color="#5784FF"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>

                    </form>
                </div>
            </Grid>
        </Grid>
    )
}
