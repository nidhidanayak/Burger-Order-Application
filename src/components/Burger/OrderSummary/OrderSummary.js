import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}> {igKey}</span>:{" "}
        {props.ingredients[igKey]}{" "}
      </li>
    );
  });

  // Salad:1

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button BtnType="Danger" clicked={props.remove}>
        CANCEL
      </Button>
      <Button BtnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
