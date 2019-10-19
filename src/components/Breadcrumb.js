import React, { Component } from "react";

export class Breadcrumb extends Component {
  render() {
    const {address} = this.props;
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light border-bottom">
          <li className="breadcrumb-item">
            My Note App
          </li>
          {
            address.map((value, index) => {
              if (index === address.length-1) 
                return ( <li key={index} className="breadcrumb-item active" aria-current="page">{value}</li>); 
              else return (<li key={index} className="breadcrumb-item">{value}</li>);
            })
          }

        </ol>
      </nav>
    );
  }
}

export default Breadcrumb;
