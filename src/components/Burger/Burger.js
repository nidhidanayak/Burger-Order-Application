import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import "./Burger.css";

const Burger = (props) => {
  let transformedingredients = Object.keys(props.ingredients)
    .map((igkey) => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngredients key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedingredients.length === 0)
    transformedingredients = (
      <p>
        <strong> Please start adding ingredients!</strong>{" "}
      </p>
    );

  return (
    <div className="Burger">
      <BurgerIngredients type="bread-top" />
      {transformedingredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
