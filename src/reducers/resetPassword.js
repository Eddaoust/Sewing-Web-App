import {SEND_MAIL_REQUEST, SEND_MAIL_SUCCESS, SEND_MAIL_ERROR, SEND_MAIL_CLEAR_ERROR,
CHECK_TOKEN_REQUEST, CHECK_TOKEN_ERROR, CHECK_TOKEN_SUCCESS, CHECK_TOKEN_CLEAR_ERROR} from "../actions/resetPassword";

export default function resetPassword(state = {loading: false, error: false, success: false}, action) {
    switch (action.type) {
        case SEND_MAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEND_MAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data,
            };
        case SEND_MAIL_SUCCESS:
            return {
                loading: false,
                error: false,
                success: true
            };
        case SEND_MAIL_CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: false,
                success: false,
            };
        case CHECK_TOKEN_REQUEST:
            return {
                loading: true,
                error: false,
                success: false,
            };
        case CHECK_TOKEN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data,
            };
        case CHECK_TOKEN_SUCCESS:
            return {
                loading: false,
                error: false,
                success: true
            };
        case CHECK_TOKEN_CLEAR_ERROR:
            return {
                loading: false,
                error: false,
                success: false
            };
        default:
            return state;
    }
}