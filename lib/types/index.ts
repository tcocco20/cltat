export interface PageData {
  blocks: BlockData[];
  title: string;
  bannerImage: WPImage | null;
}

export interface LinkData {
  title: string;
  href: string;
}

export interface BlockData {
  id: string;
  name: string;
  attributes: Record<string, string>;
  innerBlocks: BlockData[];
}

export interface WPImage {
  altText: string | null;
  url: string;
  height: number;
  width: number;
}
