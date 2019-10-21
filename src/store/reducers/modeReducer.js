import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAddMode: false,
  isEditMode: null,
  isSearchMode: null,
  isSortMode : null,
  idToConfirmDelete : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TURN_ADD_ON:
      return { ...state, isAddMode: true };
    case actionTypes.TURN_ADD_OFF:
      return { ...state, isAddMode: false };
    case actionTypes.TURN_EDIT_OFF:
      return { ...state, isEditMode: null };
    case actionTypes.TURN_EDIT_ON:
      return { ...state, isEditMode: action.itemEdit, isAddMode: false };
    case actionTypes.TURN_SEARCH_OFF:
      return { ...state, isSearchMode: null };
    case actionTypes.TURN_SEARCH_ON:
      return { ...state, isSearchMode: action.keyword };
    case actionTypes.TURN_SORT_ON:
      return { ...state, isSortMode: action.modeName };
    case actionTypes.TURN_SORT_OFF:
      return { ...state, isSortMode: null };
    case actionTypes.ADD_ID_TO_COFIRM_REMOVE:
      return { ...state, idToConfirmDelete : action.noteId };
    default:
      return state;
  }
};
