import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const TEST_QUERY = gql`
  {
    user(login: "taniotanio7") {
      bio
    }
  }
`;

function Browse(props) {
  const { data, loading, error } = useQuery(TEST_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error.</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Browse;
