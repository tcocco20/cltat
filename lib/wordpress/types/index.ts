import { Connection, ExtractVariables } from "./helper-types";
import { PageRequest } from "./request-types";
import { PageResponse } from "./response-types";

export type WordPressBlock = {
  name: string;
  attributes: Record<string, string>;
  innerBlocks?: WordPressBlock[];
};

export interface WordPressImage {
  altText: string | null;
  mediaItemUrl: string;
  mediaDetails: {
    height: number;
    width: number;
  };
}

export interface WordPressClass {
  classData: WordPressClassData;
  classInformation: WordPressClassInformation;
  classTypes: Connection<WordPressClassType>;
  databaseId: number;
}

export interface WordPressClassType {
  paymentInformation: WordPressPaymentInformation;
  name: string;
  slug: string;
  description: string;
  subtitle: {
    subtitle: string;
  };
}
interface WordPressPaymentInformation {
  cost: number;
}

interface WordPressClassInformation {
  classLocation: null | string;
  description: string;
  isRemote: boolean;
  classDateTime: string;
}

interface WordPressClassData {
  spotsTaken: number | null;
  totalSpots: number;
}

export interface AttendeeInformation {
  fullName: string;
  receiptUrl: string;
  paymentId: string;
  orderId: string;
  class: WordPressClass;
}

export interface WordPressInstructor {
  title: string;
  featuredImage: {
    node: WordPressImage;
  };
  instructorBio: {
    instructorBio: string;
  };
}

export interface WordPressLicense {
  title: string;
  slug: string;
  licenseFile: {
    file: {
      mediaItemUrl: string;
      title: string;
    };
  };
}

export type { Connection, ExtractVariables, PageRequest, PageResponse };
