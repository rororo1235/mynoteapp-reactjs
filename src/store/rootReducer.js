import { combineReducers } from "redux";
import noteReducer from "./reducers/noteReducer";
import modeReducer from "./reducers/modeReducer";
import messagesReducer from "./reducers/messagesReducer";

const rootReducer = combineReducers({
    noteData : noteReducer,
    appStatus : modeReducer,
    messages : messagesReducer
});

export default rootReducer;