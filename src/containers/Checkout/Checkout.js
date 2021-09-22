import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import { Route, withRouter, Redirect } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  cancelListener = () => {
    this.props.history.goBack();
  };

  continueListener = () => {
    this.props.history.replace("/checkout/contactdata");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const RedirectCheckout = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {RedirectCheckout}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            cancel={this.cancelListener}
            continue={this.continueListener}
          />
          <Route path="/checkout/contactdata" exact component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStatetoProps = (state) => {
  return {
    ingredients: state.BurgerBuilder.ingredients,
    purchased: state.Orders.purchased,
  };
};

export default connect(mapStatetoProps)(withRouter(Checkout));
