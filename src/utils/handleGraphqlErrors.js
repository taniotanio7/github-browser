import firebase from "firebase/app";
import "firebase/auth";
import React from "react";

export default function (error) {
  // Check if unauthenticated
  if (error?.networkError?.statusCode === 401) {
    // noinspection JSIgnoredPromiseFromCall
    firebase.auth().signOut();
  }
  return <p>Error.</p>;
}
