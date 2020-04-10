import React from "react";
import { Paper, Button, makeStyles, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";

const provider = new firebase.auth.GithubAuthProvider();

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "120px",
    margin: theme.spacing(1),
  },
}));

function Login() {
  const styles = useStyles();

  function handleLogin() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) =>
        localStorage.setItem("githubToken", result.credential.accessToken)
      );
  }

  return (
    <div className={styles.root} data-testid="loginPage">
      <Paper elevation={3} className={styles.paper}>
        <Typography align="center" gutterBottom>
          In order to use this app you need to login into your GitHub account.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={styles.button}
        >
          Login using GitHub
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
