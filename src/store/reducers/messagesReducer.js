import * as actionTypes from "../actions/actionTypes";

const initialState = [];
const MAX_MESSAGE = 5;

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.ADD_MESSAGE:
        return [ ...state.slice(-MAX_MESSAGE + 1), action.message ];
    case actionTypes.CLOSE_MESSAGE:
        return state.filter(message => message.id !== action.messageId);
    case actionTypes.CLOSE_ALL_MESSAGES:
        return [];
    default:
        return state
    }
}
