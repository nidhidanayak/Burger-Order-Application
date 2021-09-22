import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope this tastes amazing!</h1>
      <Burger ingredients={props.ingredients} />
      <Button BtnType="Danger" clicked={props.cancel}>
        {" "}
        CANCEL
      </Button>
      <Button BtnType="Success" clicked={props.continue}>
        {" "}
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
