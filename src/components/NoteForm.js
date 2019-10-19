import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";
import { addNewNote, saveEditNote } from "../store/actions/noteDataActions";
import * as messageCreator from "./helper/_messageCreator";

class NoteForm extends Component {
  
  handleCancel = event => {
    event.preventDefault();
    //var message = "";
    if (this.props.editModel != null) {
      this.props.cancelEdit();
      //message = messageCreator.getMessEditOff();
    } else {
      this.props.cancelAdd();
      //message = messageCreator.getMessAddOff();
    };
    //this.props.throwMessage(message);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitAdd = event => {
    try {
      const { title, content } = this.state;
      this.props.addNewFunc({ title, content });
      this.props.throwMessage(messageCreator.getMessAddDone());
      event.target.reset();
      this.setState({
        title: null,
        content: null
      });
    } catch (e) {}
  };

  handleSubmitEdit = () => {
    try {
    var { title, content } = this.state;
    //undefined check
    title.toString();
    content.toString();
    } catch (e) {
      if (!title) title = this.props.editModel.title;
      if (!content) content = this.props.editModel.content;
    }

    var editedItem = {};
    const lastEditDate = new Date().getTime() / 1000
    editedItem[this.props.editModel.key] = { title, content,lastEditDate };
    this.props.editSaveFunc(editedItem);
    this.props.throwMessage(messageCreator.getMessEditDone());
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.props.editModel != null) {
      this.handleSubmitEdit();
      this.props.cancelEdit();
    }
    else this.handleSubmitAdd(event);
  };

  renderValue = value => {
    return value ? value : "";
  };

  render() {
    var titleWidget = "Add";
    if (this.props.editModel != null) {
      var { key, title, content } = this.props.editModel;
      titleWidget = "Edit";
    }

    return (
      <div className="card my-2 border-primary">
        <div className="card-header">
          <h5 className="card-title">{titleWidget}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={event => this.handleSubmit(event)}>
            <input type="hidden" value={this.renderValue(key)} />
            <label htmlFor="title">Title</label>
            <input
              required
              defaultValue={this.renderValue(title)}
              type="text"
              className="form-control"
              name="title"
              onChange={event => this.handleChange(event)}
            />
            <label htmlFor="content">Content</label>
            <textarea
              required
              onChange={event => this.handleChange(event)}
              rows={6}
              type="text"
              className="form-control"
              name="content"
              defaultValue={this.renderValue(content)}
            />
            <button
              type="submit"
              className="mt-3 btn btn-block btn-outline-primary"
            >
              Save
            </button>
            <button
              type="reset"
              className="btn btn-block btn-outline-secondary"
            >
              Reset form
            </button>
            <button
              onClick={event => this.handleCancel(event)}
              className="btn btn-block btn-light"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editModel: state.appStatus.isEditMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelAdd: () => dispatch({ type: actionTypes.TURN_ADD_OFF }),
    addNewFunc: newNote => dispatch(addNewNote(newNote)),
    editSaveFunc: editNote => dispatch(saveEditNote(editNote)),
    cancelEdit: () => dispatch({ type: actionTypes.TURN_EDIT_OFF }),
    throwMessage : (message) => dispatch({type: actionTypes.ADD_MESSAGE, message})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteForm);
