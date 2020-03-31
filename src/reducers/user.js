import {USER_AUTH} from "../actions/user";

export default function user(state = {auth: false, accessToken: null, id: null, activated: false}, action) {
    switch (action.type) {
        case USER_AUTH:
            return {
                auth: true,
                accessToken: action.data.token,
                id: action.data.data.id,
                activated: action.data.data.activated
            };
        default:
            return state;
    }
}