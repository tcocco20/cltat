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

interface WordPressClassType {
  paymentInformation: WordPressPaymentInformation;
  name: string;
  slug: string;
}
interface WordPressPaymentInformation {
  cost: number;
  paymentLink: string;
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

export type { Connection, ExtractVariables, PageRequest, PageResponse };
