import React, { Component } from "react";
import "./App.css";
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import NoteList from "./components/NoteList";
import SearchAndSort from "./components/SearchAndSort";
import Actions from "./components/Actions";
import NoteForm from "./components/NoteForm";
import { connect } from "react-redux";

export class App extends Component {
  render() {
    var address = [];
    if (this.props.status.isSearchMode !== null) 
      address.push("Search '" + this.props.status.isSearchMode + "'");
    if (this.props.status.isSortMode !== null) address.push("Sort");
    if (this.props.status.isAddMode) address.push("Add");
    if (this.props.status.isEditMode !== null) address.push("Edit");  
    return (
      <div className="bg-light text-dark">
        <TopMenu />
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-8 col-12 mb-3 px-2">
              <div className="bg-white border rounded shadow-sm">
                <Breadcrumb address={address} />
                <NoteList />
              </div>
            </div>
            <div className="col-sm-4 px-2">
              <SearchAndSort />
              {this.props.status.isAddMode 
                || this.props.status.isEditMode != null ? <NoteForm /> : <Actions />}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    status : state.appStatus
  };
};

export default connect(mapStateToProps)(App);
