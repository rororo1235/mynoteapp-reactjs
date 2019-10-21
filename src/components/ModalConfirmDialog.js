import React, { Component } from 'react'
import { deleteNote } from "../store/actions/noteDataActions";
import { connect } from "react-redux";
import * as messageCreator from "./helper/_messageCreator";
import * as actionTypes from "../store/actions/actionTypes"

class ModalConfirmDialog extends Component {

    handleDelete = (noteId) => {
        const {deleteNoteIdFunc, throwMessage} = this.props;
        deleteNoteIdFunc(noteId);
        throwMessage(messageCreator.getMessDeleteDone());
    }

    render() {
        const {noteId} = this.props;
        return (
            <div className="modal fade" id="confirmModal" tabIndex={-1} role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmModalLabel">Confirm Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    <div className="modal-body">Are you sure?</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.handleDelete(noteId)}>Yes</button>
                    </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        noteId : state.appStatus.idToConfirmDelete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNoteIdFunc : (noteId) => dispatch(deleteNote(noteId)),
        throwMessage : (message) => dispatch({type: actionTypes.ADD_MESSAGE, message}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmDialog);
