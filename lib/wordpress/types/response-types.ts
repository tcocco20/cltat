import {
  Connection,
  WordPressBlock,
  WordPressClass,
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

export type SimpleClassTypesResponse = Connection<{
  name: string;
  slug: string;
}>;

export type ActiveClassesResponse = Connection<WordPressClass>;

