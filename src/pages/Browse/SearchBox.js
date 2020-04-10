import React, { useState } from "react";
import { debounce } from "lodash-es";

const SearchBox = ({ initialQuery = "", onChange }) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedFn, setDebouncedFn] = useState(null);
  const handleChange = (event) => {
    event.persist();
    const value = event.target.value;
    setQuery(value);
    if (!value) {
      // If the change was to empty field, send the result immediately
      onChange("");
      return;
    }
    const fn = debounce(() => {
      onChange(value);
    }, 600);
    setDebouncedFn(fn);
  };

  return (
    <div>
      <input
        type="text"
        name="searchQuery"
        value={query}
        onChange={handleChange}
        onBlur={() => debouncedFn && debouncedFn.flush()}
      />
    </div>
  );
};

export default SearchBox;
