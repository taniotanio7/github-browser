import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { REPOSITORY_QUERY } from "../../queries";
import handleGraphqlErrors from "../../utils/handleGraphqlErrors";
import RepositoryCard from "./RepositoryCard";
import { InView } from "react-intersection-observer";
import { CircularProgress, Typography, Fab } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useDebouncedCallback } from "use-debounce";
import "@github/g-emoji-element";

import ScrollTop from "../../components/ScrollTop";
import RepositoriesListSkeleton from "./RepositoriesListSkeleton";

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

  const [fetchNewItems] = useDebouncedCallback((searchQuery) => {
    getRepositories({ variables: { searchQuery } });
  }, 800);

  useEffect(() => {
    if (searchQuery) {
      fetchNewItems(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  if (!searchQuery) {
    return <p>Please provide a search query.</p>;
  }

  // Initial load
  if (networkStatus === 1 || networkStatus === 4 || !data) {
    return (
      <div>
        <div>
          <Skeleton
            variant="text"
            style={{ width: "33%", marginBottom: "0.35em" }}
            className={styles.searchModifiers}
          />
        </div>
        <div>
          <RepositoriesListSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return handleGraphqlErrors(error);
  }

  function handleLoadMore() {
    if (hasNextPage) {
      fetchMore({
        variables: { searchQuery, cursor: endCursor },
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
        <Typography gutterBottom>
          There were{" "}
          <span className={styles.repositoryCount}>{totalRepositories}</span>{" "}
          matching repositories.
        </Typography>
      </div>
      <div className={styles.reposList}>
        {repos.map((repo, i) => {
          return (
            <div key={repo.id}>
              {i === repos.length - 5 && (
                <InView
                  as="div"
                  triggerOnce
                  onChange={(inView) => (inView ? handleLoadMore() : null)}
                  children={null}
                />
              )}
              <RepositoryCard repo={repo} />
            </div>
          );
        })}
      </div>
      <ScrollTop className={styles.fab}>
        <Fab color="secondary">
          <ArrowUpward />
        </Fab>
      </ScrollTop>
      {/* Refetching */}
      {networkStatus === 3 && <CircularProgress className={styles.loader} />}
    </div>
  );
};

export default RepositoriesList;
