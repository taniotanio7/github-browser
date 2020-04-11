import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

const Layout = ({ children, loggedIn, location }) => {
  const styles = useStyles();

  return (
    <div className={styles.root} id="appRoot">
      <AppBar loggedIn={loggedIn} location={location} />
      {children}
    </div>
  );
};

export default Layout;
