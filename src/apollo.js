import { gql } from "apollo-boost";

const typeDefs = gql`
  extend type Repository {
    hasCardImg: Boolean!
    humanReadableName: String!
  }
`;

const resolvers = {
  Repository: {
    hasCardImg: (repo) => {
      const cardImgRegex = /^https:\/\/repository-images/g;
      return cardImgRegex.test(repo.openGraphImageUrl);
    },
    humanReadableName: (repo) => {
      const name = repo.name;
      if (name.includes("-")) {
        // Apply fixes only if the name has dashes ("-")
        return name
          .split("-")
          .reduce(
            (prev, next) =>
              `${prev}${
                next[0].toUpperCase() + next.split("").splice(1).join("")
              } `,
            ""
          )
          .padEnd(0)
          .trim();
      }
      return name;
    },
  },
};

export const apolloConfig = {
  uri: "https://api.github.com/graphql",
  clientState: {
    resolvers,
    typeDefs,
  },
};
