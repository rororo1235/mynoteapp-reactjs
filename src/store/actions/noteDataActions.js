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

export const addNewNote = (newTempItem) => {
    return () => {
        newTempItem.lastEditDate = new Date().getTime() / 1000 //time to unix
        noteDataRef.push(newTempItem).getKey();
    }
} 

export const deleteNote = (noteId) => {
    return () => {
        noteDataRef.child(noteId).remove();
    }
}

export const saveEditNote = (editedItem) => {
    return () => {
        noteDataRef.update(editedItem);
    }
}