import { CSSProperties, FC } from "react";

import LoadingRepoItem from "components/RepoSearch/LoadingRepoItem/LoadingRepoItem";
import { formatNumberToThousand } from "utils/number";
import { formatDateWithMonthName } from "utils/date";
import { truncateString } from "utils/string";
import styles from './RepoItem.module.scss';

interface RepoItemProps {
  style: CSSProperties;
  name: string;
  url: string;
  description: string;
  topics: string[];
  starsNum: number;
  language: string;
  pushedDate: string;
}

const GITHUB_TOPIC_URL = 'https://github.com/topics';
const MAX_DESCRIPTION_LENGTH = 200;
const MAX_TOPICS_NUM = 5;

const RepoItem: FC<RepoItemProps> = ({ style, name, url, description, topics, starsNum, language, pushedDate }) => {
  if (!name && !url) return <LoadingRepoItem style={style} />;

  const renderTopics = () => {
    return (
      <div className={styles.topicContainer}>
        {topics.slice(0, MAX_TOPICS_NUM).map(topic => (
          <a
            key={topic}
            className={styles.topic}
            href={`${GITHUB_TOPIC_URL}/${topic}`}
            target='_blank'
            rel="noopener noreferrer"
          >
            {topic}
          </a>
        ))}
      </div>
    );
  };

  const renderSubInfo = () => (
    <div className={styles.subInfo}>
      <span className={styles.starNum}>{formatNumberToThousand(starsNum)}</span>
      <span>• {language}</span>
      <span>Updated on {formatDateWithMonthName(pushedDate)}</span>
    </div>
  )

  return (
    <div className={styles.itemContainer} style={style}>
      <a
        className={styles.name}
        href={url}
        target='_blank'
        rel="noopener noreferrer"
      >
        {name}
      </a>
      <span>{truncateString(description, MAX_DESCRIPTION_LENGTH)}</span>
      {renderTopics()}
      {renderSubInfo()}
    </div>
  );
}


export default RepoItem;
