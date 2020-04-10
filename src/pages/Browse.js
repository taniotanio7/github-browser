import React, { useState } from "react";
import { navigate } from "@reach/router";

import SearchBox from "./Browse/SearchBox";
import RepositoriesList from "./Browse/RepositoriesList";

function Browse() {
  const urlParams = new URLSearchParams(window.location.search);
  const [searchQuery, setSarchQuery] = useState(urlParams.get("search"));

  return (
    <div>
      <SearchBox
        initialQuery={searchQuery ?? ""}
        onChange={(searchQuery) => {
          setSarchQuery(searchQuery);
          if (searchQuery) {
            navigate(`?search=${searchQuery}`, { replace: true });
          } else {
            navigate("./", { replace: true });
          }
        }}
      />
      <RepositoriesList searchQuery={searchQuery} />
    </div>
  );
}

export default Browse;
