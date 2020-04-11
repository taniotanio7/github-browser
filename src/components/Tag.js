import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  tag: {
    borderRadius: "3px",
    height: "30px",
    fontWeight: "bold",
    padding: "8px 10px",
    lineHeight: "0",
  },
});

const Tag = ({ children }) => {
  const classes = useStyles();

  return (
    <Button variant="outlined" color="secondary" className={classes.tag}>
      {children}
    </Button>
  );
};

export default Tag;
