import React, { useState } from "react";

import SearchBox from "./Browse/SearchBox";
import RepositoriesList from "./Browse/RepositoriesList";

function Browse() {
  const [searchQuery, setSarchQuery] = useState(null);

  return (
    <div>
      <SearchBox onChange={(searchQuery) => setSarchQuery(searchQuery)} />
      <RepositoriesList searchQuery={searchQuery} />
    </div>
  );
}

export default Browse;
