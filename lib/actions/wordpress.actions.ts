"use server";

import { ClassData, ClassTypeSimple } from "../types";
import {
  simpleClassTypesQuery,
  singleMenuQuery,
  singlePageQuery,
} from "../wordpress/queries";
import { PageRequest } from "../wordpress/types";
import {
  MenuRequest,
  SimpleClassTypesRequest,
} from "../wordpress/types/request-types";
import {
  removeEdgesAndNodes,
  reshapeClasses,
  reshapeMenu,
  reshapePage,
} from "../wordpress/utils";
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

export const getActiveClasses = async (): Promise<ClassData[]> => {
  return reshapeClasses([]);
};

export const getClassTypesSimple = async (): Promise<ClassTypeSimple[]> => {
  const response = await wordPressFetch<SimpleClassTypesRequest>({
    query: simpleClassTypesQuery,
  });

  return removeEdgesAndNodes(response.body.data.classTypes);
};

export const getClassTypes = async (): Promise<string[]> => {
  return [];
};
