import {LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_CLEAR_ERROR} from "../actions/login";

export default function login(state = {loading: false, error: false, attempt: false}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data,
            };
        case LOGIN_SUCCESS:
            return {
                loading: false,
                error: false,
                attempt: true
            };
        case LOGIN_CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: false,
            };
        default:
            return state;
    }
}