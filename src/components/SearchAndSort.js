import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import * as actionTypes from "../store/actions/actionTypes";
import * as messageCreator from "./helper/_messageCreator";

class SearchAndSort extends Component {

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchKey && this.state.searchKey.trim() !== "") {
      this.props.turnSearchOn(this.state.searchKey);
    }
  }

  handleCancelSearch = (event) => {
    event.target.reset();
    this.props.cancelSearch();
    this.setState({searchKey : ""});
    this.props.throwMessage(messageCreator.getMessSearchOff());
  }

  handleCancelSort = () => {
    this.props.cancelSort();
    this.props.throwMessage(messageCreator.getMessSortOff());
  }

  render() {
    const { isLoading, searchKey } = this.props;
    if (isLoading)
      return (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">View Setting</h5>
          </div>
          <div className="card-body d-flex align-items-center justify-content-center">
            <Loading />
          </div>
        </div>
      );
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">View Setting</h5>
        </div>
        <div className="card-body">
          <div className="search-form">
            <form onSubmit={(event) => this.handleSearchSubmit(event)} onReset={(event) => this.handleCancelSearch(event)}>
              <input required onChange={(event) => this.handleChange(event)} name="searchKey" type="text" className="form-control mr-2" placeholder="Search key ..." />
              <div className="float-right btn-group mt-2">
                {searchKey !== null ? <button type="reset" className="btn btn-secondary">Cancel</button> : null}
                <button type="submit" className="order-last btn btn-secondary ">Search</button>
              </div>
            </form>
            <button className="mt-2 btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort
            </button>
            <div className="dropdown-menu">
                <button className="dropdown-item btn" onClick={() => this.props.turnSortOn(actionTypes.SORT_TITLE_ASC)}>Title A-Z</button>
                <button className="dropdown-item btn" onClick={() => this.props.turnSortOn(actionTypes.SORT_TITLE_DESC)}>Title Z-A</button>
                <button className="dropdown-item btn" onClick={() => this.props.turnSortOn(actionTypes.SORT_DATE_ASC)}>Date asc</button>
                <button className="dropdown-item btn" onClick={() => this.props.turnSortOn(actionTypes.SORT_DATE_DESC)}>Date desc</button>
                <div role="separator" className="dropdown-divider" />
                <button className="dropdown-item btn" onClick={this.handleCancelSort}>Reset sort</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading : state.noteData.isLoading,
    searchKey : state.appStatus.isSearchMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    turnSearchOn : (keyword) => dispatch({type : actionTypes.TURN_SEARCH_ON, keyword}),
    cancelSearch : () => dispatch({type : actionTypes.TURN_SEARCH_OFF}),
    cancelSort : () => dispatch({type: actionTypes.TURN_SORT_OFF}),
    turnSortOn : (modeName) => dispatch({type: actionTypes.TURN_SORT_ON, modeName}),
    throwMessage : (message) => dispatch({type: actionTypes.ADD_MESSAGE, message})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSort);
