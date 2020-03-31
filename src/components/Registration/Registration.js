import React, {useEffect} from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {registrationProcess, registerClearError} from "../../actions/registration";
import {Avatar, Button, TextField, Grid, Typography, Container, CircularProgress} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import classes from '../Registration/Registration.module.css';

const Registration = (props) => {
    const dispatch = useDispatch();
    const registration = useSelector(state => state.registration);
    // Clear Error on Component unmount
    useEffect(() => {
        return () => dispatch(registerClearError());
    }, []);
    // Add fields error props
    let error = {
        email: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: [
                '', ''
            ]
        }
    };
    if (registration.error) {
        registration.error.data.map(e => {
            if (e.message === 'This value is already used.') {
                error.email.error = true;
                error.email.message = "L'email est déja utilisé.";
            } else if (e.message === 'The password must be at least 6 characters.') {
                error.password.error = true;
                error.password.message[0] = "Le mot de passe doit faire au moins 6 caractères.";
            } else if (e.message === 'This value should be identical to password') {
                error.password.error = true;
                error.password.message[1] = "Les mots de passe ne sont pas identique.";
            }
        })
    }

    return (
        <Container className={classes.Container} maxWidth="xs">
            <div className={classes.Paper}>
                {registration.loading ?
                    <CircularProgress color="secondary" /> :
                    <Avatar className={classes.Avatar}><LockOutlinedIcon/></Avatar>
                }
                <Typography component="h1" variant="h5">
                    Création de compte
                </Typography>
                <form className={classes.Form} onSubmit={e => {
                    e.preventDefault();
                    dispatch(registrationProcess({
                        firstname: e.target.querySelectorAll('input')[0].value,
                        lastname: e.target.querySelectorAll('input')[1].value,
                        email: e.target.querySelectorAll('input')[2].value,
                        password: e.target.querySelectorAll('input')[3].value,
                        password_confirmation: e.target.querySelectorAll('input')[4].value,
                    }, props));
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Prénom"
                                autoFocus
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Nom"
                                name="lastName"
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={error.email.error}
                                helperText={error.email.message}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={error.password.error}
                                helperText={error.password.message[0]}
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
                                error={error.password.error}
                                helperText={error.password.message[1]}
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
                        S'inscrire
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <RouterLink className={classes.Link} to="/">Vous avez déja un compte? Connectez vous</RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Registration;