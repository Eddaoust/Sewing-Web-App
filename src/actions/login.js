import {ROOT_URL, HTTP_HEADERS} from "./http";
import {userAuth} from "./user";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_CLEAR_ERROR = 'LOGIN_CLEAR_ERROR';

export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        data: token
    };
}

export function loginError(error) {
    return {
        type: LOGIN_ERROR,
        data: error
    }
}

export function loginClearError() {
    return {
        type: LOGIN_CLEAR_ERROR
    }
}

export function userAuthOnLogin(token) {
    return dispatch => {
        dispatch(userAuth(token));
        return dispatch(loginSuccess(token));
    }
}

export function loginProcess(formValues, props) {
    return function(dispatch) {
        dispatch(loginRequest());
        return fetch(`${ROOT_URL}/api/login_check`, {
            method: 'POST',
            headers: HTTP_HEADERS,
            body: JSON.stringify(formValues)
        })
            .then(res => {
                if (res.status !== 200) {
                    const handleError = {
                        status: res.status,
                        text: res.statusText,
                        data: ''
                    };
                    res.json()
                        .then(error => {
                            handleError.data = error;
                            dispatch(loginError(handleError));
                        })
                } else {
                    res.json()
                        .then(response => dispatch(userAuthOnLogin(response)));
                        props.history.push({
                            pathname: "/",
                        })

                }
            })
    }
}