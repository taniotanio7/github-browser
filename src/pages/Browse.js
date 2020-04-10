import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as GingerCatIllustration } from "../static/ginger-cat-746.svg";

import SearchBox from "./Browse/SearchBox";
import RepositoriesList from "./Browse/RepositoriesList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  },
  searchContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "80%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "600px",
    },
  },
  illustrationContainer: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "600px",
    },
  },
  illustration: {
    height: "80%",
    [theme.breakpoints.up("md")]: {
      height: "50%",
    },
  },
}));

function Browse() {
  const styles = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const [searchQuery, setSarchQuery] = useState(urlParams.get("search"));

  return (
    <Container className={styles.root}>
      <div className={styles.searchContainer}>
        <SearchBox
          initialQuery={searchQuery ?? ""}
          onChange={(searchQuery) => {
            setSarchQuery(searchQuery);
          }}
        />
      </div>
      {searchQuery ? (
        <RepositoriesList searchQuery={searchQuery} />
      ) : (
        <div className={styles.illustrationContainer}>
          <GingerCatIllustration width="100%" className={styles.illustration} />
          <Typography variant="h6" align="center">
            Type something in the search bar <br />
            I'll look through all public GitHub repositories for you!
          </Typography>
        </div>
      )}
    </Container>
  );
}

export default Browse;
