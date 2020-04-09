import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "@github/g-emoji-element";

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

function Browse() {
  const { data, loading, error, fetchMore } = useQuery(REPOSITORY_QUERY, {
    variables: { searchQuery: "topic:react" },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error.</p>;
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
      {repos.map((repo) => {
        return (
          <div key={repo.id}>
            <a href={repo.url}>
              <p>{repo.name}</p>
            </a>
            <p
              dangerouslySetInnerHTML={{ __html: repo.shortDescriptionHTML }}
            />
            <img
              src={repo.openGraphImageUrl}
              alt={repo.hasCardImg ? "Project header image" : "Project logo"}
              style={
                repo.hasCardImg ? { maxWidth: "400px" } : { maxHeight: "100px" }
              }
            />
            <p>Owner: {repo.owner?.login}</p>
            <p>Stars: {repo.stargazers.totalCount}</p>
            {repo.licenseInfo && (
              <p>
                Licence: {repo.licenseInfo?.nickname ?? repo.licenseInfo.name}
              </p>
            )}
            <p>
              Latest commit:{" "}
              {new Date(
                repo.defaultBranchRef.target.committedDate
              ).toLocaleDateString()}
            </p>
            <p>
              Total commit count:{" "}
              {repo.defaultBranchRef.target.history.totalCount}
            </p>
          </div>
        );
      })}
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
}

export default Browse;
