import React from "react";
import { Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cx from "clsx";

const useStyles = makeStyles((theme) => ({
  statContainer: {
    display: "flex",
    flexDirection: "column",
  },
  valueCenter: {
    justifyContent: "center",
  },
  statsGroup: {
    color: theme.palette.grey[900],
    display: "flex",
    "& > svg": {
      marginRight: theme.spacing(1),
    },
  },
  label: {
    color: theme.palette.grey[700],
  },
  labelLeft: {
    paddingLeft: `calc(21px + ${theme.spacing(1)}px)`,
  },
  labelCenter: {
    textAlign: "center",
  },
}));

const Stat = ({
  icon: Icon,
  iconProps,
  iconSize = 21,
  value,
  valuePosition = "left",
  label,
  labelPosition = "left",
  href,
}) => {
  const styles = useStyles();
  const StatComponent = href
    ? Link
    : ({ children, ...props }) => <div {...props}>{children}</div>;

  const labelClass =
    labelPosition === "left" ? styles.labelLeft : styles.labelCenter;
  const valueClass = valuePosition === "center" && styles.valueCenter;

  if (!value) {
    return null;
  }

  return (
    <div className={styles.statContainer}>
      <StatComponent className={cx(styles.statsGroup, valueClass)} href={href}>
        <Icon
          size={iconSize}
          style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
          {...iconProps}
        />
        <Typography>{value}</Typography>
      </StatComponent>
      <Typography
        variant="overline"
        component="p"
        className={cx(styles.label, labelClass)}
      >
        {label}
      </Typography>
    </div>
  );
};

export default Stat;
