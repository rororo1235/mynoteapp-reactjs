import NoteItem from "./NoteItem";
import React, { Component } from "react";
import { getAllNotes } from "../store/actions/noteDataActions";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as actionTypes from "../store/actions/actionTypes";
import * as handler from "./_function";

export class NoteList extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  getResultSearch = (keyword, allNotes) => {
    var result = {};
    Object.keys(allNotes).forEach(key => {
      if (allNotes[key].title.search(keyword) !== -1 ||
        allNotes[key].content.search(keyword) !== -1 )
        result[key] = allNotes[key];
    });
    return result;
  };

  getResultSort = (sortMode, allNotes) => {
    switch (sortMode) {
      case actionTypes.SORT_TITLE_ASC:
        return handler.sortTitleAsc(allNotes);
      case actionTypes.SORT_TITLE_DESC:
        return handler.sortTitleDesc(allNotes);
      case actionTypes.SORT_DATE_ASC:
        return handler.sortDateAsc(allNotes);
      case actionTypes.SORT_DATE_DESC:
        return handler.sortDateDesc(allNotes);
      default:
        return allNotes;
    }
  };

  render() {
    var { noteData, isLoading, searchKey, sortMode } = this.props;

    if (searchKey !== null) {
      noteData = this.getResultSearch(searchKey, noteData);
    }

    if (sortMode !== null) {
      noteData = this.getResultSort(sortMode, noteData);
    }

    if (isLoading)
      return (
        <div className="card-columns px-3 vh-100 d-flex align-items-center justify-content-center">
          <Loading />
        </div>
      );
    else if (Object.entries(noteData).length === 0)
        return (
          <div className="card-columns px-3 vh-100 d-flex justify-content-center">
            <p className="font-italic">There is 0 result.</p>
        </div>
        )
    return (
      <div className="card-columns px-3 min-vh-100">
        {Object.keys(noteData).map(key => (
          <NoteItem
            key={key}
            idItem={key}
            data={noteData[key]}
            disableEditBtn={this.props.isEditMode !== null}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    noteData: state.noteData.data,
    isLoading: state.noteData.isLoading,
    isEditMode: state.appStatus.isEditMode,
    searchKey: state.appStatus.isSearchMode,
    sortMode: state.appStatus.isSortMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotes: () => {
      dispatch(getAllNotes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
