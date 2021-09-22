import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.Logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    Logout: () => dispatch(actions.LogOut()),
  };
};

export default connect(null, mapDispatchtoProps)(Logout);
