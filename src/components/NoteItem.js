import React, { Component } from "react";
import {connect} from "react-redux";
import { deleteNote } from "../store/actions/noteDataActions";
import * as actionTypes from "../store/actions/actionTypes"
import * as messageCreator from "./helper/_messageCreator";

class NoteItem extends Component {

  handleOpenEdit = (item, id) => {
    item["key"] = id;
    this.props.enterEditMode(item);
  }

  handleDelete = (deleteId) => {
    if (window.confirm("Are you sure ?")){
      this.props.deleteFunc(deleteId);
      this.props.throwMessage(messageCreator.getMessDeleteDone());
    }
  } 

  renderNewFlag = (unixTime) => {
    const nowUnixTime = Math.round((new Date()).getTime() / 1000);
    const ONE_DAY = 86400;
    if (nowUnixTime - unixTime < ONE_DAY/2)
    return ( <span className="badge badge-danger badge-pill">new</span>);
  }

  renderDateTime = (unixTime) => {
    const date = new Date(unixTime*1000);
    return (
      <abbr title={date}>{date.toLocaleDateString()}</abbr>
    );
  }

  renderEditBtn = () => {
    if (this.props.disableEditBtn)
      return (
        <button type="button" disabled className="btn btn-sm btn-outline-secondary">Edit</button>
      )
    return (
      <button type="button" onClick={() => this.handleOpenEdit(this.props.data, this.props.idItem)} 
      className="btn btn-sm btn-outline-secondary">Edit</button>
  )}

  render() {
    const {title, lastEditDate, content} = this.props.data;
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title} {this.renderNewFlag(lastEditDate)}</h5>
          <p className="card-text mb-1">{content}</p>
          <small className="text-muted">Last updated:  {this.renderDateTime(lastEditDate)}</small>
          <div className="btn-group mt-1 d-block text-right" role="group">
            {this.renderEditBtn()}
            <button onClick={() => this.handleDelete(this.props.idItem)} type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFunc : (deleteId) => dispatch(deleteNote(deleteId)),
    enterEditMode : (noteItem) => {
      dispatch({
        type : actionTypes.TURN_EDIT_ON, 
        itemEdit : noteItem
      })
    },
    throwMessage : (message) => dispatch({type: actionTypes.ADD_MESSAGE, message})
  }
}

export default connect(null,mapDispatchToProps)(NoteItem);
