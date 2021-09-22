import React from "react";
import BuilderContent from "./BuilderContent/BuilderContent";
import classes from "./BuilderContents.module.css";

const controls = [
  { label: "Meat  ", type: "meat" },
  { label: "Bacon ", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Salad ", type: "salad" },
];

const BuilderContents = (props) => {
  return (
    <div className={classes.BuilderContents}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuilderContent
          label={ctrl.label}
          key={ctrl.label}
          added={() => props.addingredients(ctrl.type)}
          removed={() => props.removeingredients(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={props.purchasable}
        onClick={props.clicked}
      >
        {props.isAuthenticated ? (
          <strong>ORDER NOW</strong>
        ) : (
          <strong>SIGN UP TO ORDER</strong>
        )}
      </button>
    </div>
  );
};

export default BuilderContents;
