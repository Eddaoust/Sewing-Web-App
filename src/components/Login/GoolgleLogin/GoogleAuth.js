import React from 'react';
import {withRouter} from "react-router";
import {useDispatch} from "react-redux";
import GoogleLogin from 'react-google-login';
import {googleLoginProcess} from "../../../actions/login";
import classes from '../GoolgleLogin/GoogleAuth.module.css';

const GoogleAuth = (props) => {
    const dispatch = useDispatch();
    const responseGoogle = (response) => {
        dispatch(googleLoginProcess({
            user_id: response.googleId,
            access_token: response.accessToken
        }, props));
    };

    return (
    <GoogleLogin
        clientId="350854948181-5eacjajt9f15lg4dir37v8bqetui5a86.apps.googleusercontent.com"
        render={renderProps => (
            <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={classes.GoogleLoginBtn}
            ><img src="img/google.png" className={classes.GoogleImg} alt="google logo"/></button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
    />
    );
};

export default withRouter(GoogleAuth);