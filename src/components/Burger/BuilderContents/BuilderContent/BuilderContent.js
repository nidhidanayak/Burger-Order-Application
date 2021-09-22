import React from "react";
import classes from "./BuilderContent.module.css";

const BuilderContent = (props) => {
  return (
    <div className={classes.BuildControl}>
      <p className="Label">{props.label}</p>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuilderContent;
