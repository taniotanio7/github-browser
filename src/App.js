import React, { useEffect, useReducer } from "react";
import { Router } from "@reach/router";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ErrorBoundary from "react-error-boundary";
import firebase from "firebase/app";
import "firebase/auth";

import Login from "./pages/Login";
import Browse from "./pages/Browse";
import UnhandledError from "./pages/UnhandledError";

import { apolloConfig } from "./apollo";
import RepositoryDetails from "./pages/RepositoryDetails";

function getInitialState() {
  const token = localStorage.getItem("githubToken");

  if (token) {
    const apolloClient = new ApolloClient({
      ...apolloConfig,
      headers: {
        ...apolloConfig?.headers,
        Authorization: `bearer ${token}`,
      },
    });
    return { user: null, apolloClient, loading: false };
  }
  return { user: null, apolloClient: null, loading: true };
}

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      if (state.apolloClient) {
        return {
          ...state,
          user: action.payload.user,
        };
      } else {
        return {
          ...state,
          user: action.payload.user,
          apolloClient: new ApolloClient({
            ...apolloConfig,
            headers: {
              ...apolloConfig?.headers,
              Authorization: `bearer ${action.payload.token}`,
            },
          }),
        };
      }
    case "LOGOUT":
      state.apolloClient && state.apolloClient.resetStore();
      if (localStorage.getItem("githubToken")) {
        localStorage.removeItem("githubToken");
      }
      return { ...state, user: null, apolloClient: null };
    case "FINISH_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {}, getInitialState);

  // Listen for auth changes
  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const token = localStorage.getItem("githubToken");
        dispatch({ type: "LOGIN", payload: { user, token } });
      } else {
        dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "END_LOADING" });
    });
  }, []);

  if (!state.apolloClient) {
    return <Login />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={UnhandledError}
      onError={() => dispatch({ type: "LOGOUT" })}
    >
      <ApolloProvider client={state.apolloClient}>
        <Router>
          <Browse path="/" />
          <RepositoryDetails path="repo/:repoId" />
        </Router>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
