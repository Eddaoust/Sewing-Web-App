import {combineReducers} from "redux";
import user from "./user";
import login from "./login";
import registration from "./registration";
import resetPassword from "./resetPassword";

export default combineReducers({
    user,
    login,
    registration,
    resetPassword
});