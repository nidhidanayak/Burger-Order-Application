import React from "react";
import classes from "./Logo.module.css";
import BurgerLogo from "../../assets/image/burger-logo.png";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={BurgerLogo} alt="BurgerKing" />
    </div>
  );
};

export default Logo;
