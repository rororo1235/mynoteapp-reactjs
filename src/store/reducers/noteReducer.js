import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading : true,
    data : {}
}

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.GET_ALL:
        return { ...state, data : action.payload, isLoading : false };
    default:
        return state;
    }
}
