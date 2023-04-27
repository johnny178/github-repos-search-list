# Github Repos Search List

Github Repos 的搜尋網站

## Demo URL

https://github-repos-search-list.vercel.app/

## ScreenShot

<img src="https://imgur.com/6OONoCn.png" width="500"/>

## 執行

```shell
pnpm install

pnpm dev
```

預設採用 PORT 3000 做為開發使用，可透過 `http://localhost:3000` 檢視開發頁面

## 環境規劃

- 採用 React 18
- 採用 Next.js 13
- 採用 SASS 進行樣式處理
- 採用 axios + React Query 進行 HTTP 請求及 API 資料相關處理
- 採用 react-window 實現 Virtualized List 優化長列表效能

## 專案架構

```
src
 ┣ apis
 ┃ ┣ HttpCommon.ts        // 用於生成自定義 base url 及配置的 axios instance
 ┃ ┗ search.ts            // 搜尋相關 API HTTP 請求函式
 ┣ components
 ┃ ┣ Common               // 共用 component
 ┃ ┃ ┣ ErrorMessage       // 客製化錯誤訊息元件
 ┃ ┃ ┗ LoadingSkeleton
 ┃ ┣ RepoSearch           // 搜尋 repo 頁相關元件
 ┃ ┃ ┣ LoadingRepoItem
 ┃ ┃ ┣ RepoItem
 ┃ ┃ ┗ SearchBar
 ┣ constants
 ┃ ┗ repoListConfig.ts       // repo 列表相關設定值
 ┣ defines                // TypeScript 定義檔
 ┃ ┣ Api.d.ts             // API options 型別定義檔
 ┃ ┗ search.ts            // 搜尋相關型別定義檔
 ┣ hooks
 ┃ ┣ useInfiniteScroll.ts // 使用 intersection observer 實現無限滾動的 hook
 ┃ ┗ useRepoList.ts       // 使用 repo 列表資料及狀態的 hook
 ┣ pages
 ┣ styles                 // 共用 SASS 樣式
 ┃ ┣ global.scss
 ┃ ┗ reset.scss
 ┣ utils
 ┃ ┣ date.ts              // 處理日期相關共用 utils
 ┃ ┣ debounce.ts          // debounce util
 ┃ ┣ number.ts            // 處理數字相關共用 utils
 ┗ ┗ string.ts            // 處理字串相關共用 utils

```

## 開發手法

- 使用 react-window 實現 Virtualized List 優化長列表效能，只渲染可視化區域的 items。
- 使用 React Query 達成特定時間內不重複請求搜尋過的 API 資料(staleTime: 10 min, cacheTime: 15 min)，減少 http request 次數，同時增進使用者體驗。
- 使用 CompositionEvent 事件解決輸入注音、尚未選字的過程中，觸發 onChange 事件的問題，以避免不必要的 http request。
- 使用 debounce 避免連續輸入搜尋框時，連續發送 http request 的問題。
- 使用 Intersection Observer API 實作 infinite scroll。
- 使用 dynamic import 按需載入元件，加快網頁載入速度。
- 將 useInfiniteQuery 請求資料的程式碼封裝於 custom hook 中，把 display 和 data 拆成不同 layer，並提高復用性。
