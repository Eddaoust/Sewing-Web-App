import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import {loginProcess} from "../../actions/login";
import {Avatar, Button, TextField, Link, Grid, Typography, CircularProgress} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import classes from '../Login/Login.module.css';

const Login = (props) => {
    const login = useSelector(state => state.login);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
console.log(user)
    // Handle form error
    let error = false;
    let helperText = '';
    if (login.error) {
        error = true;
        helperText = 'Email ou mot de passe non valide'
    }


    return (
        <Grid container className={classes.Root}>
            <Grid item xs={false} sm={4} md={7} className={classes.Image} />
            <Grid item xs={12} sm={8} md={5} elevation={6}>
                <div className={classes.Paper}>
                    {login.loading ?
                        <CircularProgress className={classes.progress} color="secondary" /> :
                        <Avatar className={classes.Avatar}><LockOutlinedIcon/></Avatar>
                    }
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <form className={classes.Form} onSubmit={e => {
                        e.preventDefault();
                        dispatch(loginProcess({
                            username: e.target.querySelectorAll('input')[0].value,
                            password: e.target.querySelectorAll('input')[1].value
                        }, props));
                        }
                    }>
                        <TextField
                            error={error}
                            helperText={helperText}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            autoFocus
                        />
                        <TextField
                            error={error}
                            helperText={helperText}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.Submit}
                        >
                            Connexion
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" underline="none">
                                    Mot de passe oublié?
                                </Link>
                            </Grid>
                            <Grid item>
                                <RouterLink className={classes.Link} to="/registration">Créer un compte</RouterLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Login;