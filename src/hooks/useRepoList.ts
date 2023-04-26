import { useInfiniteQuery } from "@tanstack/react-query";

import { GETSearchRepos } from "apis/search";
import { PER_PAGE_NUM } from "constants/repoListConfig";

const defaultRepoList: Search.RepoList = {
  incomplete_results: false,
  items: [],
  total_count: 0,
};

const fetchRepoList = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: string[];
  pageParam?: number;
}) => {
  const searchQuery = queryKey[1];
  const page = pageParam;

  try {
    const resp = await GETSearchRepos(searchQuery, { page });

    return resp?.data ?? defaultRepoList;
  } catch (error) {
    console.log("get repo list error", error);
    throw error;
  }
};

const useRepoList = ({
  searchQuery,
  enabled,
}: {
  searchQuery: string;
  enabled: boolean;
}) => {
  const {
    data: reposList = { pages: [defaultRepoList], pageParams: [1] },
    isFetching: isRepoListFetching,
    isFetchingNextPage: isPageListFetchingNextPage,
    isError: isRepoListError,
    hasNextPage = false,
    fetchNextPage,
  } = useInfiniteQuery(["reposList", searchQuery], fetchRepoList, {
    placeholderData: { pages: [defaultRepoList], pageParams: [1] },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.items.length < PER_PAGE_NUM) return undefined;

      return allPages.length + 1;
    },
    refetchOnWindowFocus: false,
    enabled,
  });

  const totalReposNumber = (() => {
    const lastPageRepoNum = reposList?.pages?.at(-1)?.items?.length ?? 0;
    const totalPagesNum = reposList?.pages?.length ?? 1;
    const hasMultiplePages = totalPagesNum > 1;

    if (!hasMultiplePages) {
      return reposList?.pages?.[0]?.items?.length || 0;
    }

    const totalReposNum = (totalPagesNum - 1) * PER_PAGE_NUM + lastPageRepoNum;

    return totalReposNum;
  })();

  return {
    reposList,
    isRepoListFetching,
    isPageListFetchingNextPage,
    isRepoListError,
    hasNextPage,
    fetchNextPage,
    totalReposNumber,
  };
};

export default useRepoList;
