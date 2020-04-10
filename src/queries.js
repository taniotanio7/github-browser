import { gql } from "apollo-boost";

export const REPOSITORY_QUERY = gql`
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

export const REPOSITORY_DETAILS_QUERY = gql`
  query RepositoryDetails($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        nameWithOwner
        humanReadableName @client
        createdAt
        descriptionHTML
        url
        homepageUrl
        stargazers {
          totalCount
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
          }
        }
        licenseInfo {
          name
          nickname
          url
        }
        issues {
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
        readme: object(expression: "master:README.md") {
          ... on Blob {
            text
          }
        }
      }
    }
  }
`;