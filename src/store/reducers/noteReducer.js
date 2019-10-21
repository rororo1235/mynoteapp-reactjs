import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading : true,
    data : {}
}

export default (state = initialState, action) => {
    var {data : newData} = state;
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
        const {editedItem} = action;
        return { ...state, data : {...newData, editedItem}};
    default:
        return state;
    }
}
