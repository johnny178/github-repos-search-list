import { useRef, useCallback, useEffect } from "react";

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  callback: () => void;
  threshold?: number;
}

/**
 * 使用 intersection observer 實現無限滾動的 hook。
 *
 * @param {boolean} props.loading - 元件是否正在載入新資料。
 * @param {boolean} props.hasMore - 是否有更多資料要載入。
 * @param {function} props.callback - 當底部元素被觸發時要呼叫的函式。
 * @param {number} [props.threshold=0] - 觀察器的臨界點。
 */
const useInfiniteScroll = ({
  loading,
  hasMore,
  callback,
  threshold = 0,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            callback();
          }
        },
        { threshold }
      );

      if (node) observer.current.observe(node);
    },
    [loading, , threshold, hasMore, callback]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { lastElementRef };
};

export default useInfiniteScroll;
