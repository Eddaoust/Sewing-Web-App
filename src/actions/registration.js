import {ROOT_URL, HTTP_HEADERS} from "./http";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_CLEAR_ERROR = 'REGISTER_CLEAR_ERROR';

export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    };
}

export function registerSuccess(token) {
    return {
        type: REGISTER_SUCCESS,
        data: token
    };
}

export function registerError(error) {
    return {
        type: REGISTER_ERROR,
        data: error
    }
}

export function registerClearError() {
    return {
        type: REGISTER_CLEAR_ERROR
    }
}

export function registrationProcess(formValues, props) {
    return function(dispatch) {
        dispatch(registerRequest());
        return fetch(`${ROOT_URL}/registration`, {
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
                            dispatch(registerError(handleError));
                        })
                } else {
                    res.json()
                        .then(response => {
                            dispatch(registerSuccess(response));
                            //TODO check if is necessary to push
                            props.history.push({
                                pathname: "/"
                            })
                        });
                }
            })
    }
}