import * as actionTypes from "./actionTypes";
import {noteDataRef} from "../../firebase/noteDataRef";

export const getAllNotes = () => {
    return dispatch => {
        noteDataRef.on("value", notes => {
            dispatch({
                type : actionTypes.GET_ALL,
                payload : notes.val()
            })
        })
    }
}

export const addNewNote = (newItem) => {
    return dispatch => {
        newItem.lastEditDate = new Date().getTime() / 1000 //time to unix
        const id = noteDataRef.push(newItem).getKey();
        const newNote = {};
        newNote[id] = newItem;
        dispatch({
            type : actionTypes.ADD_NEW,
            newItem : newNote
        })
    }
} 

export const deleteNote = (noteId) => {
    return dispatch => {
        noteDataRef.child(noteId).remove();
        dispatch({
            type : actionTypes.DELETE,
            noteId : noteId
        })
    }
}

export const saveEditNote = (editedItem) => {
    return dispatch => {
        noteDataRef.update(editedItem);
        dispatch({
            type : actionTypes.EDIT,
            item : editedItem
        })
    }
}