import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Button,
  Link as ExternalLink,
} from "@material-ui/core";
import {
  GoOrganization,
  GoStar,
  GoMarkGithub,
  GoPerson,
  GoGitCommit,
  GoRepoForked,
} from "react-icons/go";
import { ArrowForward, Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { navigate } from "@reach/router";
import { formatDistanceToNow } from "date-fns";
import formatNumberK from "../../utils/formatNumberK";

import Tag from "../../components/Tag";
import Stat from "../../components/Stat";

const useStyles = makeStyles((theme) => ({
  owner: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "0",
    marginTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  ownerTypeIcon: {
    marginLeft: "0.45rem",
  },
  avatar: {
    width: "90px",
    height: "90px",
    border: "3px solid #fff",
    margin: "-65px 5% 0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "70px",
      height: "70px",
      margin: "-12% 5% 0 auto",
    },
    backgroundColor: "white",
    "& > img": {
      margin: 0,
    },
  },
  avatarAlt: {
    width: "90px",
    height: "90px",
    [theme.breakpoints.up("sm")]: {
      width: "70px",
      height: "70px",
    },
  },
  content: {
    padding: theme.spacing(2),
    paddingBottom: `${theme.spacing(1)}px !important`,
  },
  topics: {
    display: "flex",
    flexWrap: "wrap",
    "& > button": {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "stretch",
  },
}));

const RepositoryCard = ({ repo }) => {
  const styles = useStyles();
  const mediaStyles = useSlopeCardMediaStyles();
  return (
    <Card>
      {repo.hasCardImg && (
        <>
          <CardMedia classes={mediaStyles} image={repo.openGraphImageUrl} />
          <Avatar src={repo.owner.avatarUrl} className={styles.avatar} />
          <Typography variant="body2" className={styles.owner}>
            by&nbsp;
            {repo.owner.login}
            {repo.owner.__typename === "Organization" ? (
              <GoOrganization className={styles.ownerTypeIcon} />
            ) : (
              <GoPerson className={styles.ownerTypeIcon} />
            )}
            {repo.isFork && <GoRepoForked className={styles.ownerTypeIcon} />}
          </Typography>
        </>
      )}
      <CardContent
        className={styles.content}
        style={repo.hasCardImg ? { paddingTop: "0" } : {}}
      >
        {!repo.hasCardImg && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Avatar src={repo.owner.avatarUrl} className={styles.avatarAlt} />
            <Typography variant="body2" className={styles.owner}>
              by&nbsp;
              {repo.owner.login}
              {repo.owner.__typename === "Organization" ? (
                <GoOrganization className={styles.ownerTypeIcon} />
              ) : (
                <GoPerson className={styles.ownerTypeIcon} />
              )}
              {repo.isFork && <GoRepoForked className={styles.ownerTypeIcon} />}
            </Typography>
          </div>
        )}
        <TextInfoContent heading={repo.name} body={repo.description} />
        <div className={styles.topics}>
          {repo.repositoryTopics.nodes.map(({ topic }) => (
            <Tag key={topic.name}>{topic.name}</Tag>
          ))}
        </div>
        <div className={styles.stats}>
          <div>
            <Stat
              icon={GoStar}
              iconProps={{ size: 21 }}
              value={formatNumberK(repo.stargazers.totalCount)}
              valuePosition="center"
              label="Stars"
              labelPosition="center"
            />
          </div>
          <div>
            <Stat
              icon={GoGitCommit}
              iconProps={{ size: 21 }}
              value={formatDistanceToNow(
                new Date(repo.defaultBranchRef.target.committedDate),
                { addSuffix: true }
              )}
              valuePosition="center"
              label="Last commit"
              labelPosition="center"
            />
          </div>
        </div>
        <CardActions>
          <ExternalLink component={IconButton} href={repo.url}>
            <GoMarkGithub />
          </ExternalLink>
          {repo.homepageUrl && (
            <ExternalLink component={IconButton} href={repo.homepageUrl}>
              <Home style={{ width: 29, height: 29 }} />
            </ExternalLink>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/repo/${repo.id}`)}
            endIcon={<ArrowForward />}
            style={{ marginLeft: "auto" }}
          >
            View details
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default RepositoryCard;
