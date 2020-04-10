import React, { useState } from "react";

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
        }}
      />
      <RepositoriesList searchQuery={searchQuery} />
    </div>
  );
}

export default Browse;
