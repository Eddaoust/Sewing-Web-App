import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR, REGISTER_CLEAR_ERROR} from "../actions/registration";

export default function registration(state = {loading: false, error: false, attempt: false}, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                loading: true,
                error: false,
                attempt: false
            };
        case REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data,
            };
        case REGISTER_SUCCESS:
            return {
                loading: false,
                error: false,
                attempt: true
            };
        case REGISTER_CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: false,
            };
        default:
            return state;
    }
}