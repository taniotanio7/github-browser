import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
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

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onChange(value);
    if (value) {
      navigate(`?search=${encodeURI(value)}`, { replace: true });
    } else {
      navigate("./", { replace: true });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newQuery = urlParams.get("search") ?? "";
    if (newQuery !== query) {
      setQuery(newQuery);
      onChange(newQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
