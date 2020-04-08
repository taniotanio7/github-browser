import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("firebase/app", () => {
  const implementation = {
    auth: () => {
      return {
        onAuthStateChanged: jest.fn((callback) => callback(null)),
        signInWithPopup: jest.fn((provider) =>
          Promise.resolve({ credential: { accessToken: "12345" } })
        ),
      };
    },
  };
  implementation.auth.GithubAuthProvider = jest.fn();
  return implementation;
});

jest.mock("apollo-boost");

test("displays login page when user is not signed in", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("loginPage")).toBeInTheDocument();
});

test("localstorage is checked for Github token", () => {
  jest.spyOn(window.localStorage.__proto__, "getItem");
  window.localStorage.__proto__.getItem = jest.fn((key) =>
    key === "githubToken" ? "12345" : null
  );

  render(<App />);
  expect(localStorage.getItem).toHaveBeenCalled();
});
