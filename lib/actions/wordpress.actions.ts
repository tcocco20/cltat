"use server";

import { singleMenuQuery, singlePageQuery } from "../wordpress/queries";
import { PageRequest } from "../wordpress/types";
import { MenuRequest } from "../wordpress/types/request-types";
import { reshapeMenu, reshapePage } from "../wordpress/utils";
import { wordPressFetch } from "../wordpress/wordpressFetch";

export const getSinglePage = async (slug: string) => {
  const response = await wordPressFetch<PageRequest>({
    query: singlePageQuery,
    variables: { slug },
  });

  return reshapePage(response.body.data.page);
};

export const getMenu = async (slug: string) => {
  const response = await wordPressFetch<MenuRequest>({
    query: singleMenuQuery,
    variables: { slug },
  });

  return reshapeMenu(response.body.data.menu);
};
