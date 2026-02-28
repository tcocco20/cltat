import { Connection, ExtractVariables } from "./helper-types";
import { PageRequest } from "./request-types";
import { PageResponse } from "./response-types";

export type WordPressBlock = {
  name: string;
  attributes: Record<string, string | number | boolean>;
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
  isPaid: boolean;
}

interface WordPressClassInformation {
  classLocation: string;
  description: string;
  isRemote: boolean;
  classDateTime: string;
  endDateTime: string | null;
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
  } | null;
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
