import { Connection, ExtractVariables } from "./helper-types";
import { PageRequest } from "./request-types";
import { PageResponse } from "./response-types";

export type WordPressBlock = {
  name: string;
  attributes: Record<string, string>;
  innerBlocks?: WordPressBlock[];
};

export interface WordPressImage {
  altText: string;
  mediaItemUrl: string;
  mediaDetails: {
    sizes: {
      sourceUrl: string;
      name: string;
      width: number;
      height: number;
    }[];
  };
}

export type { Connection, ExtractVariables, PageRequest, PageResponse };
