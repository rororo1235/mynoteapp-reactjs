import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";
import jsonExporter from "./helper/jsonExporter";

class Actions extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isExporting : false
    }
  }
  
  handleExport = (noteData) => {
    this.setState({ isExporting : true });
    setTimeout(() =>  
      jsonExporter(noteData, "myappnote-data", () => this.setState({ isExporting : false }))
    , 3000)
  }

  renderLoadingBtn = () => (
    <button className="btn btn-block btn-success" disabled>
      <span className="spinner-border-sm spinner-border" role="status" />
      <span className="sr-only">Loading...</span>
    </button>
    )
  
  render() {
    return (
      <div className="card my-2">
        <div className="card-header">
          <h5 className="card-title">Action</h5>
        </div>
        <div className="card-body">
          <button className="btn btn-block btn-primary" onClick={this.props.showNoteForm}>Add</button>
          {this.state.isExporting ? this.renderLoadingBtn() : <button className="btn btn-block btn-outline-success" onClick={() => this.handleExport(this.props.noteData)}>Export all</button>}
          <button className="btn btn-block btn-outline-danger" onClick={() => alert("This function is disabled.")}>Clear all</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    noteData: state.noteData.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showNoteForm : () => {dispatch({type: actionTypes.TURN_ADD_ON})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
