export interface PageData {
  blocks: BlockData[];
  title: string;
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