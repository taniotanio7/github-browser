import React from "react";
import { gql } from "apollo-boost";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@apollo/react-hooks";
import handleGraphqlErrors from "../utils/handleGraphqlErrors";

const REPOSITORY_DETAILS_QUERY = gql`
  query RepositoryDetails($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        nameWithOwner
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

const RepositoryDetails = ({ repoId }) => {
  const { data, loading, error } = useQuery(REPOSITORY_DETAILS_QUERY, {
    variables: { id: repoId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return handleGraphqlErrors(error);
  }

  const repo = data.node;
  console.log(repo);

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>Repository name: {repo.nameWithOwner}</p>
      <p>Issues: {repo.issues.totalCount}</p>
      <a href={repo.licenseInfo.url}>
        <p>Licence: {repo.licenseInfo.name}</p>
      </a>
      <p>Stars: {repo.stargazers.totalCount}</p>
      <p>Created at: {repo.createdAt}</p>
      <p>Latest commit: {repo.defaultBranchRef.target.committedDate}</p>
      <p>Total commits: {repo.defaultBranchRef.target.history.totalCount}</p>
      <a href={repo.url}>View on Github</a>
      {repo.homepageUrl && <a href={repo.homepageUrl}>View project website</a>}
      <h2>Description</h2>
      <p dangerouslySetInnerHTML={{ __html: repo.descriptionHTML }} />
      <h2>Topics</h2>
      {repo.repositoryTopics?.nodes && (
        <div>
          {repo.repositoryTopics.nodes.map(({ topic }) => (
            <span key={topic.name}>{topic.name}&nbsp;</span>
          ))}
        </div>
      )}
      <h2>Readme content</h2>
      {repo.readme && <ReactMarkdown source={repo.readme.text} />}
    </div>
  );
};

export default RepositoryDetails;
