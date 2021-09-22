import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div onClick={props.removebcd}>
      {props.show ? (
        <div className={classes.Backdrop}>{props.children}</div>
      ) : null}{" "}
    </div>
  );
};

export default Backdrop;
