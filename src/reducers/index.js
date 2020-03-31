import {combineReducers} from "redux";
import user from "./user";
import login from "./login";
import registration from "./registration";

export default combineReducers({
    user,
    login,
    registration
});