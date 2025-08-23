import {
  Connection,
  WordPressBlock,
  WordPressImage,
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
