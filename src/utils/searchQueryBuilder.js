// To filter results we have to use Github search query strings:
// https://help.github.com/en/github/searching-for-information-on-github/searching-for-repositories#search-by-topic
// https://help.github.com/en/github/searching-for-information-on-github/sorting-search-results
// https://github.com/search/advanced

function repositoriesSearchQueryBuilder(options) {
  let searchQuery = "";
  switch (Object.keys(options)) {
    case "user":
      searchQuery += `user:${options.user} `;
      break;
    case "org":
      searchQuery += `org:${options.org} `;
      break;
    case "followers":
      searchQuery += `followers:>=${options.followers}`;
      break;
    case "forks":
      searchQuery += `forks:>=${options.forks}`;
      break;
    case "stars":
      searchQuery += `stars:>=${options.stars}`;
      break;
    case "pushed":
      searchQuery += `pushed:>=${options.pushed}`;
      break;
    case "language":
      searchQuery += `language:${options.language}`;
      break;
    case "topic":
      searchQuery += `topic:${options.topic}`;
      break;
    case "license":
      searchQuery += `license:${options.license}`;
      break;
    case "archived":
      searchQuery += `archived:${options.archived}`;
      break;
    case "firstIssue":
      searchQuery += `good-first-issue:>=${options.firstIssue}`;
      break;
    case "helpWanted":
      searchQuery += `help-wanted-issues:>=${options.helpWanted}`;
      break;
  }
  return searchQuery;
}

export const repositorySearchQueryBuilder = repositoriesSearchQueryBuilder;
