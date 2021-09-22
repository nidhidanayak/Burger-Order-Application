import React, { Component } from "react";
import "./Layout.css";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../Toolbar/SideDrawer/SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    show: false,
  };

  ShowSideDrawer = () => {
    this.setState({ show: true });
  };

  RemoveHandler = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          clicked={this.ShowSideDrawer}
          isAuthenticated={this.props.isAuthenticated}
        />
        {this.state.show ? (
          <div>
            <SideDrawer isAuthenticated={this.props.isAuthenticated} />
            <Backdrop show={this.state.show} removebcd={this.RemoveHandler} />
          </div>
        ) : null}
        <main className="Layout">{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.Auth.token,
  };
};

export default connect(mapStatetoProps)(Layout);
