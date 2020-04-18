import React from 'react';
import {withRouter} from "react-router";
import {useDispatch} from "react-redux";
import {facebookLoginProcess} from "../../../actions/login";
import FacebookLogin from 'react-facebook-login';
import classes from '../FacebookLogin/FacebookAuth.module.css';

const FacebookAuth = (props) => {
    const dispatch = useDispatch();
    const responseFacebook = (response) => {
        dispatch(facebookLoginProcess({
            user_id: response.userID,
            access_token: response.accessToken
        }, props));
    };

    return (
        <FacebookLogin
            appId="598619570995767"
            textButton={null}
            cssClass={classes.FbLoginBtn}
            icon="fa-facebook"
            callback={responseFacebook} />
    );
};

export default withRouter(FacebookAuth);
