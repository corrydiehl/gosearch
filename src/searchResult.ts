export interface ISearchResult {
  query: string;
  Hits: [ISearchHit];
}

export interface ISearchHit {
  name: string;
  package: string;
  author: string;
  synopsis: string;
  description: string;
  projecturl: string;
}