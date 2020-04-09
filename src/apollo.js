import { gql } from "apollo-boost";

const typeDefs = gql`
  extend type Repository {
    hasCardImg: Boolean!
  }
`;

const resolvers = {
  Repository: {
    hasCardImg: (repo) => {
      const cardImgRegex = /^https:\/\/repository-images/g;
      return cardImgRegex.test(repo.openGraphImageUrl);
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
