import React, { useEffect, useReducer } from "react";
import { Router } from "@reach/router";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ErrorBoundary from "react-error-boundary";
import firebase from "firebase/app";
import "firebase/auth";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import UnhandledError from "./pages/UnhandledError";

import { apolloConfig, setupPersistentCache } from "./apollo";
import RepositoryDetails from "./pages/RepositoryDetails";
import CircularProgress from "@material-ui/core/CircularProgress";

function getInitialState() {
  const token = localStorage.getItem("githubToken");
  return { user: null, token, apolloClient: null, loading: true };
}

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      state.apolloClient && state.apolloClient.resetStore();
      if (localStorage.getItem("githubToken")) {
        localStorage.removeItem("githubToken");
      }
      return { ...state, token: null, user: null, apolloClient: null };
    case "APOLLO_SETUP_FINISHED":
      return { ...state, apolloClient: action.payload.apolloClient };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    default:
      throw new Error("Reducer operation does not exist");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {}, getInitialState);

  // Listen for auth changes
  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "START_LOADING" });
        const token = localStorage.getItem("githubToken");
        dispatch({ type: "LOGIN", payload: { user, token } });
      } else {
        dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "END_LOADING" });
    });
  }, []);

  // Setup Apollo client
  useEffect(() => {
    if (state.token && !state.apolloClient) {
      (async () => {
        const cache = await setupPersistentCache();
        const apolloClient = new ApolloClient({
          ...apolloConfig,
          headers: {
            ...apolloConfig?.headers,
            Authorization: `bearer ${state.token}`,
          },
          cache,
        });
        dispatch({ type: "APOLLO_SETUP_FINISHED", payload: { apolloClient } });
        dispatch({ type: "END_LOADING" });
      })();
    }
  }, [state]);

  if (state.loading) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }
  if (!state.apolloClient) {
    return (
      <Layout>
        <Login />
      </Layout>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={UnhandledError}
      onError={() => {
        if (process.env?.NODE_ENV !== "development") {
          dispatch({ type: "LOGOUT" });
        }
      }}
    >
      <Layout loggedIn={true}>
        <ApolloProvider client={state.apolloClient}>
          <Router style={{ flexGrow: 1, display: "flex" }}>
            <Browse path="/" />
            <RepositoryDetails path="repo/:repoId" />
          </Router>
        </ApolloProvider>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
