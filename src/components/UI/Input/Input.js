import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let InputElement = null;

  let InputClass = [classes.InputElement];
  if (props.validation && props.istouched) {
    InputClass.push(classes.InvalidElement);
  }

  switch (props.eletype) {
    case "input":
      InputElement = (
        <input
          className={InputClass.join(" ")}
          {...props.eleconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "textarea":
      InputElement = (
        <textarea
          className={InputClass.join(" ")}
          {...props.eleconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      InputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.eleconfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayvalue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      InputElement = (
        <input
          className={InputClass.join(" ")}
          {...props.eleconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{InputElement}</label>
    </div>
  );
};

export default Input;
