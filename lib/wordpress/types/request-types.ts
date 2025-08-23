import { MenuResponse, PageResponse } from "./response-types";

export type PageRequest = {
  data: {
    page: PageResponse;
  };
  variables: {
    slug: string;
  };
};

export type MenuRequest = {
  data: {
    menu: MenuResponse;
  };
  variables: {
    slug: string;
  };
};
