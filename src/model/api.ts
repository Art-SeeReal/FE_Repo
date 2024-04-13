export interface GetShowListsResponse {
  results: {
    id: number;
    poster: string;
    title: string;
    regions: {
      code: string;
      label: string;
    };
    fields: {
      code: string;
      label: string;
    };
    RegDate: string;
  }[];
  count: number;
}
