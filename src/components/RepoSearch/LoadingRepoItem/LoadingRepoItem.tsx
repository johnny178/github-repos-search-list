import React, { forwardRef, CSSProperties } from 'react';

import LoadingSkeleton from 'components/Common/LoadingSkeleton/LoadingSkeleton';
import styles from '../RepoItem/RepoItem.module.scss';

const LOADING_SKELETON_HEIGHT = 15;
const SKELETON_COUNT = 3;

interface LoadingRepoItemProps {
  style: CSSProperties;
}

const LoadingRepoItem = forwardRef<HTMLDivElement, LoadingRepoItemProps>(({ style }, ref) => {
  return (
    <div ref={ref} className={styles.itemContainer} style={style}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <LoadingSkeleton key={index} height={LOADING_SKELETON_HEIGHT} margin="10px 0" />
      ))}
    </div>
  );
});

LoadingRepoItem.displayName = 'LoadingRepoItem';

export default LoadingRepoItem;
