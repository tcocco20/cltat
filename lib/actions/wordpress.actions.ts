"use server";

import { singlePageQuery } from "../wordpress/queries";
import { PageRequest } from "../wordpress/types";
import { reshapePage } from "../wordpress/utils";
import { wordPressFetch } from "../wordpress/wordpressFetch";

export const getSinglePage = async (slug: string) => {
  const response = await wordPressFetch<PageRequest>({
    query: singlePageQuery,
    variables: { slug },
  });

  return reshapePage(response.body.data.page);
};
