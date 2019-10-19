import { combineReducers } from "redux";
import noteReducer from "./reducers/noteReducer";
import modeReducer from "./reducers/modeReducer";

const rootReducer = combineReducers({
    noteData : noteReducer,
    appStatus : modeReducer
});

export default rootReducer;