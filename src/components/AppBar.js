import React from "react";
import {
  AppBar as DefaultAppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { GoOctoface } from "react-icons/go";
import { navigate } from "@reach/router";
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  appIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBar = ({ loggedIn, ...props }) => {
  const styles = useStyles();

  return (
    <DefaultAppBar position="static" {...props}>
      <Toolbar>
        <GoOctoface size={28} className={styles.appIcon} />
        <Typography variant="h6" className={styles.title}>
          Github Browser
        </Typography>
        {loggedIn && (
          <Button
            color="inherit"
            onClick={() => {
              firebase.auth().signOut();
              navigate("/");
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </DefaultAppBar>
  );
};

export default AppBar;
