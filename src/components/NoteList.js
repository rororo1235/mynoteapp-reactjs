import NoteItem from "./NoteItem";
import React, { Component } from "react";
import { getAllNotes } from "../store/actions/noteDataActions";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as actionTypes from "../store/actions/actionTypes";
import * as helper from "./helper/_function";

class NoteList extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  hasKeywordInTitleAndContent = (keyword, title, content) => {
    return title.search(keyword) !== -1 || content.search(keyword) !== -1;
  }

  getResultSearch = (keyword, allNotes) => {
    var result = {};
    Object.keys(allNotes).forEach(key => {
      if (this.hasKeywordInTitleAndContent(keyword, allNotes[key].title, allNotes[key].content))
        result[key] = allNotes[key];
    });
    return result;
  };

  getResultSort = (sortMode, allNotes) => {
    switch (sortMode) {
      case actionTypes.SORT_TITLE_ASC:
        return helper.sortTitleAsc(allNotes);
      case actionTypes.SORT_TITLE_DESC:
        return helper.sortTitleDesc(allNotes);
      case actionTypes.SORT_DATE_ASC:
        return helper.sortDateAsc(allNotes);
      case actionTypes.SORT_DATE_DESC:
        return helper.sortDateDesc(allNotes);
      default:
        return allNotes;
    }
  };

  getEditingId = () => {
    return this.props.editModel !== null ? this.props.editModel.id : null;
  }

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
            idEditing={this.getEditingId()}
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
    editModel: state.appStatus.isEditMode,
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
