import { randomUUID } from "crypto";
import { BlockData, PageData, WPImage } from "../types";
import {
  Connection,
  PageResponse,
  WordPressBlock,
  WordPressImage,
} from "./types";

export function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
  return array.edges.map((edge) => edge?.node);
}

export function reshapeImage(image: WordPressImage | null): WPImage | null {
  if (!image) return null;

  return {
    altText: image.altText,
    url: image.mediaItemUrl,
    height: image.mediaDetails.height,
    width: image.mediaDetails.width,
  };
}

export const reshapePage = (page: PageResponse): PageData | null => {
  if (!page) return null;

  return {
    blocks: reshapeBlocks(page.blocks),
    title: page.title,
    bannerImage: reshapeImage(page.pageBanner.pageBanner),
  };
};

export const reshapeBlocks = (blocks: WordPressBlock[]) => {
  const assignIds = (block: WordPressBlock[]): BlockData[] => {
    return block.map((b) => ({
      ...b,
      id: randomUUID(),
      innerBlocks: b.innerBlocks?.length ? assignIds(b.innerBlocks) : [],
    }));
  };

  return assignIds(blocks);
};
