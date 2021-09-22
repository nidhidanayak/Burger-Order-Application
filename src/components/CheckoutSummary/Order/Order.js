import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  let Ingredient = [];
  for (let i in props.ingredients) {
    Ingredient.push({
      name: i,
      amount: props.ingredients[i],
    });
  }

  let IngredientOutput = Ingredient.map((ig) => {
    return (
      <span className={classes.OrderDetails} key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {IngredientOutput}</p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
