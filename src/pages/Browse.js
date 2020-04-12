import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as GingerCatIllustration } from "../static/ginger-cat-746.svg";
import debounceRender from "react-debounce-render";

import SearchBox from "./Browse/SearchBox";
import RepositoriesList from "./Browse/RepositoriesList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
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
    height: "250px",
    [theme.breakpoints.up("sm")]: {
      height: "300px",
    },
    [theme.breakpoints.up("md")]: {
      height: "400px",
    },
  },
}));

const DisplayContent = React.memo(({ searchQuery }) => {
  console.log("rerender content");
  const styles = useStyles();
  return searchQuery ? (
    <RepositoriesList searchQuery={searchQuery} />
  ) : (
    <div className={styles.illustrationContainer}>
      <GingerCatIllustration width="100%" className={styles.illustration} />
      <Typography variant="h6" align="center">
        Type something in the search bar <br />
        I'll look through all public GitHub repositories for you!
      </Typography>
    </div>
  );
});

const DebouncedDisplayContent = debounceRender(DisplayContent, 500);

function Browse() {
  const styles = useStyles();
  const [searchQuery, setSarchQuery] = useState("");

  return (
    <Container className={styles.root}>
      <div className={styles.searchContainer}>
        <SearchBox
          query={searchQuery}
          onChange={(searchQuery) => {
            setSarchQuery(searchQuery);
          }}
        />
      </div>
      <DebouncedDisplayContent searchQuery={searchQuery} />
    </Container>
  );
}

export default Browse;
