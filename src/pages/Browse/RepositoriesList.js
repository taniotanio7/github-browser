import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { REPOSITORY_QUERY } from "../../queries";
import handleGraphqlErrors from "../../utils/handleGraphqlErrors";
import RepositoryCard from "./RepositoryCard";
import { InView } from "react-intersection-observer";
import { CircularProgress, Typography, Fab } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "@github/g-emoji-element";

import ScrollTop from "../../components/ScrollTop";

const useStyles = makeStyles((theme) => ({
  searchModifiers: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
  repositoryCount: {
    fontWeight: 500,
  },
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
  loader: {
    position: "fixed",
    top: "10px",
    right: "10px",
  },
  fab: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    [theme.breakpoints.up("sm")]: {
      bottom: "20px",
      right: "20px",
    },
  },
}));

const RepositoriesList = ({ searchQuery }) => {
  const styles = useStyles();
  const [
    getRepositories,
    { data, error, fetchMore, networkStatus },
  ] = useLazyQuery(REPOSITORY_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (searchQuery) {
      getRepositories({ variables: { searchQuery } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  if (!searchQuery) {
    return <p>Please provide a search query.</p>;
  }

  // Initial load
  if (networkStatus === 1 || networkStatus === 4 || !data) {
    return <CircularProgress />;
  }

  if (error) {
    return handleGraphqlErrors(error);
  }

  function handleLoadMore() {
    if (hasNextPage) {
      fetchMore({
        variables: { searchQuery: "topic:react", cursor: endCursor },
        updateQuery: (
          previousResult,
          { fetchMoreResult: { search: result } }
        ) => {
          const previousEdges = previousResult.search.edges;
          const newEdges = result.edges;
          const newPageInfo = result.pageInfo;

          if (newEdges.length) {
            return {
              search: {
                __typename: previousResult.search.__typename,
                edges: [...previousEdges, ...newEdges],
                pageInfo: newPageInfo,
                repositoryCount: result.repositoryCount,
              },
            };
          } else {
            return previousResult;
          }
        },
      });
    }
  }
  const repos = data.search.edges.map((obj) => obj.node);
  const totalRepositories = data.search.repositoryCount;
  const endCursor = data.search.pageInfo.endCursor;
  const hasNextPage = data.search.pageInfo.hasNextPage;

  return (
    <div data-testid="browserPage">
      <div className={styles.searchModifiers}>
        <Typography>
          There were{" "}
          <span className={styles.repositoryCount}>{totalRepositories}</span>{" "}
          matching repositories.
        </Typography>
      </div>
      <div className={styles.reposList}>
        {repos.map((repo, i) => {
          return (
            <React.Fragment key={repo.id}>
              <RepositoryCard repo={repo} />
              {i === repos.length - 3 && (
                <InView
                  as="div"
                  triggerOnce
                  onChange={(inView) => (inView ? handleLoadMore() : null)}
                  children={null}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Refetching */}
      <ScrollTop className={styles.fab}>
        <Fab color="secondary">
          <ArrowUpward />
        </Fab>
      </ScrollTop>
      {networkStatus === 3 && <CircularProgress className={styles.loader} />}
    </div>
  );
};

export default RepositoriesList;
