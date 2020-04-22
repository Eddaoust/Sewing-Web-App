import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {Redirect, useLocation, withRouter} from "react-router-dom";
import classes from '../../ResetPassword/ResetPasswordForm/ResetPasswordForm.module.css';
import {checkTokenClearError, checkTokenProcess} from "../../../actions/resetPassword";

// Custom React Hook
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const resetPassword = useSelector(state => state.resetPassword);
    let query = useQuery();

    // Redirect to login if token is not set, empty or server respond error
    let redirect;
    if (!query.get("token") || query.get("token") === '' || resetPassword.error) {
        redirect = <Redirect to="/"/>
    }

    // Check token on mount & clear error on unmount
    useEffect(() => {
        dispatch(checkTokenProcess({
            token: query.get("token")
        }))
        return () => dispatch(checkTokenClearError());
    }, []);


    return (
        <Container className={classes.Container} maxWidth="xs">
            {redirect}
            <div className={classes.Paper}>
                <Typography component="h1" variant="h5">
                    Réinitialisation du mot de passe
                </Typography>
                <form className={classes.Form} onSubmit={e => {
                    e.preventDefault();

                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
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