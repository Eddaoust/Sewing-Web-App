import React, {useEffect} from "react";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import classes from '../../ResetPassword/MailForm/MailForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {sendMailProcess, sendMailClearError} from "../../../actions/resetPassword";

const MailForm = (props) => {
    const dispatch = useDispatch();
    const resetPassword = useSelector(state => state.resetPassword);
    // Clear Error on Component unmount
    useEffect(() => {
        return () => dispatch(sendMailClearError());
    }, []);

    //Handle error
    let error = false;
    let helperText = '';
    if (resetPassword.error && resetPassword.error.data === "Unable to find user") {
        error = true;
        helperText = 'Impossible de trouver un utilisateur lié à cette adresse email.';
    } else if (resetPassword.error && resetPassword.error.data === "Unable to reset password from social media account") {
        error = true;
        helperText = 'Impossible de réinitialiser le mot de passe d\'un compte lié à un réseau social';
    }

    return (
        <Container className={classes.Container} maxWidth="xs">
            <div className={classes.Paper}>
                <Typography component="h1" variant="h5">
                    Réinitialisation du mot de passe
                </Typography>
                <form className={classes.Form} onSubmit={e => {
                    e.preventDefault();
                    dispatch(sendMailProcess({
                        email: e.target.querySelectorAll('input')[0].value,
                    }, props));
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={error}
                                helperText={helperText}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
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
                    <Grid container justify="flex-end">
                        <Grid item>
                            <RouterLink className={classes.Link} to="/">Accueil</RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default MailForm;