import styles from './LoadingSkeleton.module.scss'

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number | string;
  margin?: string;
}

/**
  一個可重複使用的 component，可以渲染具有自訂寬度、高度、邊緣和邊框半徑的 loading skeleton。
  @param {number | string} [props.width="100%"] - loading skeleton的寬度。
  @param {number | string} [props.height="100%"] - loading skeleton的高度。
  @param {string} [props.margin="initial"] - loading skeleton的邊緣。
  @returns {JSX.Element} loading skeleton元件。
*/
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '100%',
  margin = 'initial',
}) => {
  return <div className={styles.loadingSkeleton} style={{ width, height, margin }} />;
};

export default LoadingSkeleton;
