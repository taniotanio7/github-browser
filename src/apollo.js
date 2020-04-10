import { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import localforage from "localforage";

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

export async function setupPersistentCache() {
  const cache = new InMemoryCache();

  const localforageApollo = localforage.createInstance({
    name: "apollo-cache",
  });

  await persistCache({ cache, storage: localforageApollo });
  return cache;
}

export const apolloConfig = {
  uri: "https://api.github.com/graphql",
  clientState: {
    resolvers,
    typeDefs,
  },
};
