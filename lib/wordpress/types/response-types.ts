import { WordPressBlock, WordPressImage } from "@/lib/wordpress/types";

export interface PageResponse {
  blocks: WordPressBlock[];
  title: string;
  pageBanner: {
    pageBanner: WordPressImage | null;
  };
}
