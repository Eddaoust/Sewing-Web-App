import {ROOT_URL, HTTP_HEADERS} from "./http";

export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_ERROR = 'SEND_MAIL_ERROR';
export const SEND_MAIL_CLEAR_ERROR = 'SEND_MAIL_CLEAR_ERROR';

export const CHECK_TOKEN_REQUEST = 'CHECK_TOKEN_REQUEST';
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS';
export const CHECK_TOKEN_ERROR = 'CHECK_TOKEN_ERROR';
export const CHECK_TOKEN_CLEAR_ERROR = 'CHECK_TOKEN_CLEAR_ERROR';

export function sendMailRequest() {
    return {
        type: SEND_MAIL_REQUEST,
    };
}

export function sendMailSuccess() {
    return {
        type: SEND_MAIL_SUCCESS,
    };
}

export function sendMailError(error) {
    return {
        type: SEND_MAIL_ERROR,
        data: error
    }
}

export function sendMailClearError() {
    return {
        type: SEND_MAIL_CLEAR_ERROR
    }
}

export function sendMailProcess(formValues, props) {
    return function(dispatch) {
        dispatch(sendMailRequest());
        return fetch(`${ROOT_URL}/password/request`, {
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
                            dispatch(sendMailError(handleError));
                        })
                } else {
                    res.json()
                        .then(response => {
                            dispatch(sendMailSuccess(response));
                            props.history.push({
                                pathname: "/"
                            })
                        });
                }
            })
    }
}

export function checkTokenRequest() {
    return {
        type: CHECK_TOKEN_REQUEST,
    };
}

export function checkTokenSuccess() {
    return {
        type: CHECK_TOKEN_SUCCESS,
    };
}

export function checkTokenError(error) {
    return {
        type: CHECK_TOKEN_ERROR,
        data: error
    }
}

export function checkTokenClearError() {
    return {
        type: CHECK_TOKEN_CLEAR_ERROR
    }
}

export function checkTokenProcess(formValues) {
    return function(dispatch) {
        dispatch(checkTokenRequest());
        return fetch(`${ROOT_URL}/password/check`, {
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
                            dispatch(checkTokenError(handleError));
                        })
                } else {
                    res.json()
                        .then(response => {
                            dispatch(checkTokenSuccess(response));
                        });
                }
            })
    }
}