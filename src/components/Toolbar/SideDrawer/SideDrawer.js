import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems";
import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </div>
  );
};

export default SideDrawer;
