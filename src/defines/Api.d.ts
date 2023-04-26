namespace Api {
  interface SearchOptions {
    sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
    order?: "desc" | "asc";
    per_page?: number;
    page?: number;
  }
}
