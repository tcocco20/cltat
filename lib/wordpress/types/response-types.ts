import {
  AttendeeInformation,
  Connection,
  WordPressBlock,
  WordPressClass,
  WordPressClassType,
  WordPressImage,
  WordPressInstructor,
} from "@/lib/wordpress/types";

export interface PageResponse {
  blocks: WordPressBlock[];
  title: string;
  pageBanner: {
    pageBanner: WordPressImage | null;
  };
}
export interface MenuResponse {
  menuItems: Connection<{
    path: string;
    label: string;
  }>;
}

export type SimpleClassTypesResponse = Connection<{
  name: string;
  slug: string;
}>;

export type ClassTypesResponse = Connection<WordPressClassType>;

export type ActiveClassesResponse = Connection<WordPressClass>;

export type SimpleClassApiResponse = {
  classTypes: {
    edges: [
      {
        node: {
          paymentInformation: {
            cost: number;
          };
        };
      }
    ];
  };
  classInformation: {
    classDateTime: string;
  };
  classData: {
    spotsTaken: number | null;
    totalSpots: number;
  };
};

export interface AttendeeResponse {
  databaseId: number;
  attendeeInformation: AttendeeInformation;
}

export type InstructorsResponse = Connection<WordPressInstructor>;
