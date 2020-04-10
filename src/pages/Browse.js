import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { InView } from "react-intersection-observer";
import { CircularProgress } from "@material-ui/core";
import "@github/g-emoji-element";
import { makeStyles } from "@material-ui/core/styles";

import RepositoryCard from "./Browse/RepositoryCard";
import handleGraphqlErrors from "../utils/handleGraphqlErrors";

const REPOSITORY_QUERY = gql`
  query QueryRepositoriesList($searchQuery: String!, $cursor: String) {
    search(type: REPOSITORY, query: $searchQuery, first: 9, after: $cursor) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            id
            viewerHasStarred
            description
            shortDescriptionHTML
            url
            name
            homepageUrl
            isArchived
            openGraphImageUrl
            hasCardImg @client
            repositoryTopics(first: 3) {
              nodes {
                topic {
                  name
                }
              }
            }
            isFork
            owner {
              login
            }
            stargazers {
              totalCount
            }
            licenseInfo {
              name
              nickname
              url
            }
            assignableUsers {
              totalCount
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  loader: {
    position: "fixed",
    top: "10px",
    right: "10px",
  },
});

function Browse() {
  const { data, error, fetchMore, networkStatus } = useQuery(REPOSITORY_QUERY, {
    variables: { searchQuery: "topic:react" },
    notifyOnNetworkStatusChange: true,
    returnPartialData: true,
  });
  const styles = useStyles();

  // Initial load
  if (networkStatus === 1) {
    return <p>Loading...</p>;
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
      <p>Total repositories matching query: {totalRepositories}</p>
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
      {/* Refetching */}
      {networkStatus === 3 && <CircularProgress className={styles.loader} />}
    </div>
  );
}

export default Browse;
