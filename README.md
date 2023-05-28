# Github Repos Search List

A website for searching Github Repos

## Demo URL

https://github-repos-search-list.vercel.app/

## ScreenShot

<img src="https://imgur.com/6OONoCn.png" width="500"/>

## Execution

```shell
pnpm install

pnpm dev
```

By default, PORT 3000 is used for development. You can view the development page through `http://localhost:3000`.

## Environment Planning

- Adopting React 18
- Using Next.js 13
- Styling with SASS
- Utilizing axios + React Query for HTTP requests and API data handling
- Implementing Virtualized List for optimizing long list performance with react-window 

## Project Structure

```
src
├── apis
│   ├── HttpCommon.ts              // Generates a customized axios instance with base url and configurations
│   └── search.ts                  // Functions for search-related API HTTP requests
├── components
│   ├── Common                     // Shared components
│   │   ├── ErrorMessage           // Custom error message component
│   │   └── LoadingSkeleton
│   └── RepoSearch                 // Components related to the repo search page
│       ├── LoadingRepoItem
│       ├── RepoItem
│       └── SearchBar
├── constants
│   └── repoListConfig.ts          // Configuration values related to the repo list
├── defines
│   ├── Api.d.ts                   // API option type definition file
│   └── Search.d.ts                // Search-related type definition file
├── hooks
│   ├── useInfiniteScroll.ts       // A hook using intersection observer for infinite scrolling
│   └── useRepoList.ts             // A hook for using the repo list data and state
├── pages
├── styles                         // Shared SASS styles
│   ├── global.scss
│   └── reset.scss
└── utils
    ├── date.ts                    // Shared utils for handling dates
    ├── debounce.ts                // Debounce util
    ├── number.ts                  // Shared utils for handling numbers
    └── string.ts                  // Shared utils for handling strings
```

## Development Approach

- Using react-window to implement a Virtualized List that optimizes long list performance by rendering only the items in the visible area.
- Using React Query to avoid redundant requests for the same API data within a specific time (staleTime: 10 min, cacheTime: 15 min), reducing the number of HTTP requests and enhancing user experience.
- Using CompositionEvent to resolve the issue of triggering onChange events during the process of phonetic input and before character selection, thereby avoiding unnecessary HTTP requests.
- Using debounce to prevent continuous HTTP requests when inputting into the search box continuously.
- Implementing infinite scroll using the Intersection Observer API.
- Using dynamic import to load components as needed, accelerating web page loading speed.
- Encapsulating the code requesting data with useInfiniteQuery into a custom hook, separating display and data into different layers and enhancing reusability.
