import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuilderContents from "../../components/Burger/BuilderContents/BuilderContents";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios/axios";
import Aux from "../../hoc/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loader: false,
  };

  calculatecontents = () => {
    const content = Object.keys(this.props.ingredients)
      .map((igKey) => this.props.ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return content > 0;
  };

  purchasehandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  removebackdrophandler = () => {
    this.setState({ purchasing: false });
  };

  continuehandler = () => {
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.setIngredients();
    this.props.initPurchase();
  }

  render() {
    let disabledinfo = { ...this.props.ingredients };
    for (let key in disabledinfo) {
      disabledinfo[key] = disabledinfo[key] <= 0;
    }

    let BurgerSetup = null;
    this.props.error
      ? (BurgerSetup = (
          <h2 style={{ textAlign: "center" }}> Couldn't Load HomePage!</h2>
        ))
      : (BurgerSetup = <Spinner />);
    let orderSummary = null;

    if (this.props.ingredients) {
      BurgerSetup = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuilderContents
            addingredients={(type) => this.props.addingredients(type)}
            removeingredients={(type) => this.props.removeingredients(type)}
            price={this.props.totalprice}
            disabled={disabledinfo}
            purchasable={!this.calculatecontents()}
            clicked={this.purchasehandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalprice}
          ingredients={this.props.ingredients}
          remove={this.removebackdrophandler}
          continue={this.continuehandler}
        />
      );
      if (this.state.loader) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <div>
        <Backdrop
          show={this.state.purchasing}
          removebcd={this.removebackdrophandler}
        />
        <Modal show={this.state.purchasing}>{orderSummary}</Modal>
        {BurgerSetup}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ingredients: state.BurgerBuilder.ingredients,
    totalprice: state.BurgerBuilder.totalprice,
    error: state.BurgerBuilder.error,
    isAuthenticated: state.Auth.token !== null,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addingredients: (type) => dispatch(actionCreators.addIngredients(type)),
    removeingredients: (type) =>
      dispatch(actionCreators.removeingredients(type)),
    setIngredients: () => dispatch(actionCreators.setIngredients()),
    initPurchase: () => dispatch(actionCreators.initPurchase()),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(BurgerBuilder, axios));
