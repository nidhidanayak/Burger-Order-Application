import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "./Navigation/NavigationItems";
import DrawerToggle from "../Toolbar/SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked} />
      <Logo />
      <nav>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default Toolbar;
