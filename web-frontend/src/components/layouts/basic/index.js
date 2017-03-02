//noinspection JSUnresolvedVariable
import React, {Component} from "react";
import Header from "./header";
import Footer from "./footer";
import "./main.css";

export default class extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="page-wrapper">
        <Header/>
        <div className="main-wrapper">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
