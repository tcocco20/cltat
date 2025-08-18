import { PageResponse } from "./response-types";

export type PageRequest = {
  data: {
    page: PageResponse;
  };
  variables: {
    slug: string;
  };
};
