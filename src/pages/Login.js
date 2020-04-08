import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

const provider = new firebase.auth.GithubAuthProvider();

function Login(props) {
  function handleLogin() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) =>
        localStorage.setItem("githubToken", result.credential.accessToken)
      );
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
