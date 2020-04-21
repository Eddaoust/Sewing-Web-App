import React from "react";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {useLocation} from "react-router-dom";
import classes from '../../ResetPassword/ResetPasswordForm/ResetPasswordForm.module.css';
import {sendMailProcess} from "../../../actions/resetPassword";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
    let query = useQuery();

    console.log(query.get("token"));

    return (
        <Container className={classes.Container} maxWidth="xs">
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

export default ResetPasswordForm;