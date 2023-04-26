import httpCommon from "./HttpCommon";
import { AxiosPromise } from "axios";

const GITHUB_API_URL = "https://api.github.com";

const routerApiClient = httpCommon(GITHUB_API_URL);

export function GETSearchRepos(
  searchQuery: string,
  options?: Api.SearchOptions
): AxiosPromise<Search.RepoList> {
  const url = `/search/repositories?q=${searchQuery}`;

  return routerApiClient.get(url, { params: options });
}
