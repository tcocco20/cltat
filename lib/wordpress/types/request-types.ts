import {
  ActiveClassesResponse,
  MenuResponse,
  PageResponse,
  SimpleClassTypesResponse,
} from "./response-types";

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

export type SimpleClassTypesRequest = {
  data: {
    classTypes: SimpleClassTypesResponse;
  };
};

export type AllActiveClassesRequest = {
  data: {
    classes: ActiveClassesResponse;
  };
  variables: {
    today: string;
  };
};
