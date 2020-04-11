import React from "react";
import {
  AppBar as DefaultAppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { GoOctoface } from "react-icons/go";
import { ArrowBack } from "@material-ui/icons";
import { navigate, Match } from "@reach/router";
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  backBtn: {
    marginRight: theme.spacing(2),
    marginLeft: "-12px",
  },
  appIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "flex",
    cursor: "pointer",
    flexGrow: 1,
  },
}));

const AppBar = ({ loggedIn, ...props }) => {
  const styles = useStyles();

  return (
    <Match path="/">
      {({ location: { pathname, search }, match }) => (
        <DefaultAppBar position="static" {...props}>
          <Toolbar id="top">
            {((pathname === "/" && search !== "") || !match) && (
              <IconButton
                onClick={() => {
                  if (match) {
                    navigate("/");
                  } else {
                    navigate(-1);
                  }
                }}
                color="inherit"
                className={styles.backBtn}
              >
                <ArrowBack />
              </IconButton>
            )}
            <div onClick={() => navigate("/")} className={styles.title}>
              <GoOctoface size={28} className={styles.appIcon} />
              <Typography variant="h6">Github Browser</Typography>
            </div>
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
      )}
    </Match>
  );
};

export default AppBar;
