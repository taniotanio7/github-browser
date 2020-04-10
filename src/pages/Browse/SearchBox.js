import React, { useState } from "react";
import { debounce } from "lodash-es";

const SearchBox = ({ onChange }) => {
  const [debouncedFn, setDebouncedFn] = useState(null);
  const handleChange = (event) => {
    event.persist();
    if (!event.target.value) {
      // If the change was to empty field, send the result immediately
      onChange("");
      return;
    }
    const fn = debounce(() => {
      onChange(event.target.value);
    }, 600);
    setDebouncedFn(fn);
  };

  return (
    <div>
      <input
        type="text"
        name="searchQuery"
        onChange={handleChange}
        onBlur={() => debouncedFn && debouncedFn.flush()}
      />
    </div>
  );
};

export default SearchBox;
