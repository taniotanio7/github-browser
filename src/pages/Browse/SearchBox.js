import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { debounce } from "lodash-es";
import { navigate, useLocation } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    "&:focus-within": {
      boxShadow: theme.shadows[10],
    },
  },
  containerFilled: {
    width: "100%",
    backgroundColor: "transparent",
    boxShadow: theme.shadows[7],
    "&:focus-within": {
      boxShadow: theme.shadows[5],
    },
  },
  icon: {
    color: theme.palette.grey[700],
  },
}));

const SearchBox = ({ onChange }) => {
  const styles = useStyles();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [debouncedFn, setDebouncedFn] = useState(null);

  const handleChange = (event) => {
    event.persist();
    const value = event.target.value;
    setQuery(value);
    if (value) {
      navigate(`?search=${value}`, { replace: true });
    } else {
      navigate("./", { replace: true });
    }
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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newQuery = urlParams.get("search") ?? "";
    if (newQuery !== query) {
      setQuery(newQuery);
      onChange(newQuery);
    }
  }, [location]);

  return (
    <Paper
      elevation={20}
      className={query ? styles.containerFilled : styles.container}
    >
      <TextField
        fullWidth
        type="text"
        name="searchQuery"
        variant="outlined"
        value={query ?? ""}
        onChange={handleChange}
        onBlur={() => debouncedFn && debouncedFn.flush()}
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search size={26} className={styles.icon} />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default SearchBox;
