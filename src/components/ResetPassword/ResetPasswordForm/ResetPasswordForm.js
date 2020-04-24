import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {Redirect, useLocation, withRouter} from "react-router-dom";
import classes from '../../ResetPassword/ResetPasswordForm/ResetPasswordForm.module.css';
import {checkTokenClearError, checkTokenProcess, resetPwdProcess} from "../../../actions/resetPassword";

// Custom React Hook
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = (props) => {
    const dispatch = useDispatch();
    const resetPassword = useSelector(state => state.resetPassword);
    let query = useQuery();

    console.log(resetPassword);

    // Check token on mount & clear error on unmount
    useEffect(() => {
        dispatch(checkTokenProcess({
            token: query.get("token")
        }))
        return () => dispatch(checkTokenClearError());
    }, []);

    // Redirect to login if token is not set, empty or server respond error
    let redirect;
    if (!query.get("token") || query.get("token") === '') {
        redirect = <Redirect to="/"/>
    }

    //Handle error
    let error = {
        error: false,
        message: [
           '', ''
       ]
    }

    if (resetPassword.error) {
        if (resetPassword.error.data === 'Invalid Token' || resetPassword.error.data === 'Unable to find user') {
            redirect = <Redirect to="/"/>
        } else {
            resetPassword.error.data.map(e => {
                if (e.message === 'The password must be at least 6 characters.') {
                    error.error = true;
                    error.message[0] = "Le mot de passe doit faire au moins 6 caractères.";
                } else if (e.message === 'This value should be identical to password') {
                    error.error = true;
                    error.message[1] = "Les mots de passe ne sont pas identique.";
                }
            })
        }
    }


    return (
        <Container className={classes.Container} maxWidth="xs">
            {redirect}
            <div className={classes.Paper}>
                <Typography component="h1" variant="h5">
                    Réinitialisation du mot de passe
                </Typography>
                <form className={classes.Form} onSubmit={e => {
                    e.preventDefault();
                    dispatch(resetPwdProcess({
                        token: query.get("token"),
                        password: e.target.querySelectorAll('input')[0].value,
                        password_confirmation: e.target.querySelectorAll('input')[1].value,
                    }, props));

                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={error.error}
                                helperText={error.message[0]}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={error.error}
                                helperText={error.message[1]}
                                variant="outlined"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Confirmation du mot de passe"
                                type="password"
                                id="confirm_password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className={classes.Button}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Récupérer le mot de passe
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(ResetPasswordForm);