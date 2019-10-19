import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";

class Actions extends Component {
  render() {
    return (
      <div className="card my-2">
        <div className="card-header">
          <h5 className="card-title">Action</h5>
        </div>
        <div className="card-body">
          <button className="btn btn-block btn-primary" onClick={this.props.showNoteForm}>Add</button>
          <button className="btn btn-block btn-danger">Clear all</button>
          {/* <button className="btn btn-block btn-primary" disabled>
            <span className="spinner-border-sm spinner-border" role="status" />
            <span className="sr-only">Loading...</span>
          </button> */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showNoteForm : () => {dispatch({type: actionTypes.TURN_ADD_ON})}
  }
}

export default connect(null,mapDispatchToProps)(Actions);
