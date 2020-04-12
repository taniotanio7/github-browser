import React, { useEffect } from "react";
import { TextField, InputAdornment, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { navigate, useLocation } from "@reach/router";
import { useDebouncedCallback } from "use-debounce";

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

const SearchBox = ({ query = "", onChange }) => {
  const styles = useStyles();
  const location = useLocation();

  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  const [setNewUrl] = useDebouncedCallback(() => {
    console.log("setting new url");
    if (query) {
      navigate(`?search=${encodeURI(query)}`, { replace: true });
    } else {
      navigate("./", { replace: true });
    }
  }, 1000);

  useEffect(() => {
    setNewUrl();
  }, [query, setNewUrl]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newQuery = urlParams.get("search") ?? "";
    if (newQuery !== query) {
      onChange(newQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <Paper
      elevation={20}
      className={query ? styles.containerFilled : styles.container}>
      <TextField
        fullWidth
        type="text"
        name="searchQuery"
        variant="outlined"
        value={query}
        onChange={handleChange}
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
