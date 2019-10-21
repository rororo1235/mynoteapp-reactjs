import React, { Component } from 'react'

class ModalConfirmDialog extends Component {
    render() {
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
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ModalConfirmDialog;
