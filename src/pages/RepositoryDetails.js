import React from "react";
import {
  Container,
  Typography,
  Paper,
  IconButton,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  GoStar,
  GoIssueOpened,
  GoMarkGithub,
  GoLaw,
  GoGitCommit,
} from "react-icons/go";
import { Home, History, Today } from "@material-ui/icons";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@apollo/react-hooks";
import { formatDistanceToNow } from "date-fns";
import handleGraphqlErrors from "../utils/handleGraphqlErrors";
import formatNumberK from "../utils/formatNumberK";

import { REPOSITORY_DETAILS_QUERY } from "../queries";
import Tag from "../components/Tag";
import Stat from "../components/Stat";
import RepositoryDetailsSkeleton from "./RepositoryDetails/RepositoryDetailsSkeleton";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  links: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  tags: {
    display: "flex",
    marginTop: "-8px",
    flexWrap: "wrap",
    "& > button": {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  statsContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  stats: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "& > div": {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  readmeContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  readmeContent: {
    "& a": {
      color: theme.palette.primary.main,
    },
  },
}));

const RepositoryDetails = ({ repoId }) => {
  const styles = useStyles();
  const { data, loading, error } = useQuery(REPOSITORY_DETAILS_QUERY, {
    variables: { id: repoId },
  });

  // if (true) {
  if (loading) {
    return <RepositoryDetailsSkeleton />;
  }

  if (error) {
    return handleGraphqlErrors(error);
  }

  const repo = data.node;

  return (
    <Container className={styles.container}>
      <Typography variant="h4" component="h2" align="center">
        {repo.humanReadableName}
      </Typography>
      <Typography align="center">by {repo.owner.login}</Typography>
      <div className={styles.links}>
        <Link href={repo.url} component={IconButton} color="inherit">
          <GoMarkGithub />
        </Link>
        {repo.homepageUrl && (
          <Link href={repo.homepageUrl} component={IconButton} color="inherit">
            <Home style={{ height: 28, width: 28 }} />
          </Link>
        )}
      </div>
      <Typography variant="overline">Tags</Typography>
      <div className={styles.tags}>
        {repo.repositoryTopics?.nodes &&
          repo.repositoryTopics.nodes.map(({ topic }) => (
            <Tag key={topic.name}>{topic.name}</Tag>
          ))}
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: repo.descriptionHTML }} />
      </div>
      <Paper elevation={6} className={styles.statsContainer}>
        <Typography variant="h6" component="h3">
          Stats
        </Typography>
        <div className={styles.stats}>
          <Stat
            label="Open issues"
            icon={GoIssueOpened}
            value={repo.issues.totalCount}
          />
          <Stat
            label="Licence"
            icon={GoLaw}
            value={repo.licenseInfo?.name}
            href={repo.licenseInfo?.url}
          />
          <Stat
            label="Stars"
            icon={GoStar}
            value={formatNumberK(repo.stargazers.totalCount)}
          />
          <Stat
            label="Crated"
            icon={History}
            value={formatDistanceToNow(new Date(repo.createdAt), {
              addSuffix: true,
            })}
          />
          <Stat
            label="Latest commit"
            icon={Today}
            value={formatDistanceToNow(
              new Date(repo.defaultBranchRef.target.committedDate),
              { addSuffix: true }
            )}
          />
          <Stat
            label="Total commits"
            icon={GoGitCommit}
            value={repo.defaultBranchRef.target.history.totalCount}
          />
        </div>
      </Paper>
      <Paper className={styles.readmeContainer}>
        <Typography variant="h6" component="h3">
          Project Readme
        </Typography>
        {repo.readme && (
          <ReactMarkdown
            source={repo.readme.text}
            className={styles.readmeContent}
          />
        )}
      </Paper>
    </Container>
  );
};

export default RepositoryDetails;
