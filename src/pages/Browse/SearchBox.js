import React, { useState } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { debounce } from "lodash-es";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.grey[700],
  },
}));

const SearchBox = ({ initialQuery = "", onChange }) => {
  const styles = useStyles();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedFn, setDebouncedFn] = useState(null);
  const handleChange = (event) => {
    event.persist();
    const value = event.target.value;
    if (value) {
      navigate(`?search=${value}`, { replace: true });
    } else {
      navigate("./", { replace: true });
    }
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
    <TextField
      fullWidth
      type="text"
      name="searchQuery"
      variant="outlined"
      value={query}
      onChange={handleChange}
      onBlur={() => debouncedFn && debouncedFn.flush()}
      placeholder="Search..."
      className={styles.input}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search size={26} className={styles.icon} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBox;
