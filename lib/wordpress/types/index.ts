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
  id: string;
}

export type { Connection, ExtractVariables, PageRequest, PageResponse };
