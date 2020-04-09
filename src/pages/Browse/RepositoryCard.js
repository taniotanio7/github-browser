import React from "react";

const RepositoryCard = ({ repo }) => {
  return (
    <div key={repo.id}>
      <a href={repo.url}>
        <p>{repo.name}</p>
      </a>
      <p dangerouslySetInnerHTML={{ __html: repo.shortDescriptionHTML }} />
      <img
        src={repo.openGraphImageUrl}
        alt={repo.hasCardImg ? "Project header image" : "Project logo"}
        style={repo.hasCardImg ? { maxWidth: "400px" } : { maxHeight: "100px" }}
      />
      <p>Owner: {repo.owner?.login}</p>
      <p>Stars: {repo.stargazers.totalCount}</p>
      {repo.licenseInfo && (
        <p>Licence: {repo.licenseInfo?.nickname ?? repo.licenseInfo.name}</p>
      )}
      <p>
        Latest commit:{" "}
        {new Date(
          repo.defaultBranchRef.target.committedDate
        ).toLocaleDateString()}
      </p>
      <p>
        Total commit count: {repo.defaultBranchRef.target.history.totalCount}
      </p>
    </div>
  );
};

export default RepositoryCard;
