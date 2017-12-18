import { combineReducers } from "redux";
import location from "./location";
import search from "./search";

export default combineReducers({
    location,
    searchView: search,
});
