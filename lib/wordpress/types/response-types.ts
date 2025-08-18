import { WordPressBlock } from "@/lib/wordpress/types";

export interface PageResponse {
  blocks: WordPressBlock[];
  title: string;
}
