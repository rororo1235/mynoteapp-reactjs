import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading : true,
    data : {}
}

export default (state = initialState, action) => {
    var newData = state.data;
    switch (action.type) {
    case actionTypes.GET_ALL:
        return { ...state, data : action.payload, isLoading : false }
    case actionTypes.ADD_NEW:
        return { ...state, data : Object.assign(action.newItem, state.data)}
    case actionTypes.DELETE:
        Object.keys(newData).filter(key => key === action.noteId)
            .forEach(key => delete newData[key]);
        return { ...state, data : newData };
    case actionTypes.EDIT:
        const idItem = Object.keys(action.item)[0];
        newData[idItem] = action.item[idItem];
        return { ...state, data : newData};
    default:
        return state
    }
}
