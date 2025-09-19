import {
  ActiveClassesResponse,
  AttendeeResponse,
  ClassTypesResponse,
  InstructorsResponse,
  MenuResponse,
  PageResponse,
  SimpleClassApiResponse,
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

export type InstructorsRequest = {
  data: {
    instructors: InstructorsResponse;
  };
};

export type ClassTypesRequest = {
  data: {
    classTypes: ClassTypesResponse;
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

export type SimpleClassApiRequest = {
  data: {
    class: SimpleClassApiResponse;
  };
  variables: {
    id: number;
  };
};

export type AttendeeRequest = {
  data: {
    attendee: AttendeeResponse;
  };
  variables: {
    id: number;
  };
};
