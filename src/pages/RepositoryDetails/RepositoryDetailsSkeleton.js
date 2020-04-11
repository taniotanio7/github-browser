import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Paper, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { TagSkeleton } from "../Browse/RepositoriesListSkeleton";
import { random } from "lodash-es";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  links: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  tatsContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  tags: {
    display: "flex",
    marginTop: "-8px",
    flexWrap: "wrap",
    "& > span": {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  statsContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  stats: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "& > div": {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  readmeContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const StatSkeleton = () => {
  const width = random(70, 170, false);
  return <Skeleton variant="rect" height={55} width={width} />;
};

const RepositoryDetailsSkeleton = () => {
  const styles = useStyles();
  const tagNumber = random(4, 7, false);
  return (
    <Container className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton variant="text" height={41} width="20%" />
        <Skeleton variant="text" height={24} width="10%" />
      </div>
      <div className={styles.links}>
        <Skeleton
          variant="circle"
          height={24}
          width={24}
          style={{ marginRight: "24px" }}
        />
        <Skeleton variant="circle" height={24} width={24} />
      </div>
      <Typography variant="overline">Tags</Typography>
      <div className={styles.tags}>
        {[...Array(tagNumber).keys()].map((i) => (
          <TagSkeleton key={i} />
        ))}
      </div>
      <Skeleton variant="text" width="40%" />
      <Paper elevation={6} className={styles.statsContainer}>
        <Typography variant="h6" component="h3">
          Stats
        </Typography>
        <div className={styles.stats}>
          {[...Array(6).keys()].map((i) => (
            <StatSkeleton key={i} />
          ))}
        </div>
      </Paper>
      <Paper className={styles.readmeContainer}>
        <Typography variant="h6" component="h3">
          Project Readme
        </Typography>
        <Skeleton type="rect" width="100%" height="600px" />
      </Paper>
    </Container>
  );
};

export default RepositoryDetailsSkeleton;
