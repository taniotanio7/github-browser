import React from "react";
import { Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { random } from "lodash-es";

const useListStyles = makeStyles((theme) => ({
  reposList: {
    display: "grid",
    gridTemplateColumns: "1fr",
    alignItems: "start",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    gridRowGap: theme.spacing(3),
    gridColumnGap: theme.spacing(2),
  },
}));

const useCardStyles = makeStyles((theme) => ({
  container: {
    padding: "16px 16px 8px 16px",
  },
  avatar: {
    width: "90px",
    height: "90px",
    [theme.breakpoints.up("sm")]: {
      width: "70px",
      height: "70px",
    },
  },
  topics: {
    display: "flex",
    flexWrap: "wrap",
    "& > span": {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  linkAction: {
    margin: "12px",
    // marginRight: "8px",
  },
}));

const INITIAL_AMOUNT = 9;

export const TagSkeleton = () => {
  const width = random(60, 130, false);
  return <Skeleton variant="rect" height={28} width={width} />;
};

export const RepositoryCardSkeleton = () => {
  const styles = useCardStyles();
  const tagNumber = random(1, 3, false);

  // 72, 48, 24
  return (
    <Paper className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <Skeleton variant="circle" className={styles.avatar} />
        <Skeleton variant="text" width="6em" />
      </div>
      <div>
        <Skeleton variant="text" width="33%" height="41px" />
        <Skeleton
          variant="text"
          width="100%"
          // Random height, multiplies of 24px
          height={`${Math.ceil((Math.random() * 100) % 4) * 24}px`}
        />
      </div>
      <div className={styles.topics}>
        {[...Array(tagNumber).keys()].map((i) => (
          <TagSkeleton key={i} />
        ))}
      </div>
      <Skeleton
        variant="rect"
        width="100%"
        height="55px"
        style={{ marginTop: "16px" }}
      />
      <div className={styles.actions}>
        <Skeleton
          variant="circle"
          width={24}
          height={24}
          className={styles.linkAction}
        />
        <Skeleton
          variant="circle"
          width={24}
          height={24}
          className={styles.linkAction}
        />
        <Skeleton
          variant="rect"
          width={120}
          height={24}
          style={{ marginLeft: "auto" }}
        />
      </div>
    </Paper>
  );
};

const RepositoriesListSkeleton = () => {
  const styles = useListStyles();
  return (
    <div className={styles.reposList}>
      {[...Array(INITIAL_AMOUNT).keys()].map((i) => (
        <RepositoryCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default RepositoriesListSkeleton;
