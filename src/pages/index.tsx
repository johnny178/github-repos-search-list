import { CSSProperties, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import SearchBar from 'components/RepoSearch/SearchBar/SearchBar';
import LoadingRepoItem from 'components/RepoSearch/LoadingRepoItem/LoadingRepoItem';
import useRepoList from 'hooks/useRepoList';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { LIST_HEIGHT, PER_PAGE_NUM, REPO_ITEM_HEIGHT } from 'constants/repoListConfig';

const List = dynamic(() => import('react-window').then(module => module.FixedSizeList));
const RepoItem = dynamic(() => import('components/RepoSearch/RepoItem/RepoItem'));
const ErrorMessage = dynamic(() => import('components/Common/ErrorMessage/ErrorMessage'));

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const {
    reposList,
    isRepoListFetching,
    isPageListFetchingNextPage,
    isRepoListError,
    hasNextPage,
    fetchNextPage,
    totalReposNumber
  } = useRepoList({ searchQuery: searchText, enabled: !!searchText });

  const isNoData = searchText && !isRepoListFetching && totalReposNumber === 0 && !isRepoListError;
  const listItemCount = (() => {
    if (isRepoListFetching && !isPageListFetchingNextPage) return PER_PAGE_NUM;

    return hasNextPage ? totalReposNumber + 1 : totalReposNumber;
  })()

  const { lastElementRef } = useInfiniteScroll({
    isLoading: isRepoListFetching,
    hasMore: hasNextPage,
    callback: fetchNextPage,
  })

  const renderRepoItems = ({ index, style }: { index: number, style: CSSProperties }) => {
    const page = Math.floor(index / PER_PAGE_NUM);
    const indexOfPage = index % PER_PAGE_NUM;
    const repo = reposList.pages[page]?.items[indexOfPage];
    const isLastIndex = totalReposNumber === index;

    if (isLastIndex) {
      return <LoadingRepoItem ref={lastElementRef} style={style} />
    }

    return (
      <RepoItem
        style={style}
        name={repo?.full_name ?? ''}
        url={repo?.html_url ?? ''}
        description={repo?.description ?? ''}
        topics={repo?.topics ?? []}
        starsNum={repo?.stargazers_count ?? 0}
        language={repo?.language ?? ''}
        pushedDate={repo?.pushed_at ?? ''}
      />
    )
  }

  return (
    <>
      <Head>
        <title>Github Repos Search List</title>
        <meta name="description" content="Github Repos Search List" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ maxWidth: '80%', margin: 'auto' }}>
        <SearchBar setSearchText={setSearchText} />
        {isRepoListError && <ErrorMessage text='請求資料失敗，請稍後再試...' />}
        {isNoData && <ErrorMessage text='查無資料' />}
        {searchText && !isRepoListError && !isNoData &&
          <List
            key={searchText}
            className="List"
            height={LIST_HEIGHT}
            width='100%'
            itemCount={listItemCount}
            itemSize={REPO_ITEM_HEIGHT}
          >
            {renderRepoItems}
          </List>
        }
      </main>
    </>
  )
}
