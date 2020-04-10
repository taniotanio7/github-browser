import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTlklb3mWCqOjQQo7LHLvTcwlH6ysHgvM",
  authDomain: "github-browser-dcaca.firebaseapp.com",
  databaseURL: "https://github-browser-dcaca.firebaseio.com",
  projectId: "github-browser-dcaca",
  storageBucket: "github-browser-dcaca.appspot.com",
  messagingSenderId: "371646819710",
  appId: "1:371646819710:web:d2f749fc1c154ae484172f",
};

firebase.initializeApp(firebaseConfig);

let content = (
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // React.Strictmode causes the Apollo Devtools to not work properly, omit in development build
  content = (
    <>
      <CssBaseline />
      <App />
    </>
  );
}

ReactDOM.render(content, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
