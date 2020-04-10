import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const Layout = ({ children, loggedIn }) => {
  const styles = useStyles();

  return (
    <div className={styles.root} id="appRoot">
      <AppBar loggedIn={loggedIn} />
      {children}
    </div>
  );
};

export default Layout;
