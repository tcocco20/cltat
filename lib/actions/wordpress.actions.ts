"use server";

import {
  AttendeeData,
  ClassData,
  ClassTypeSimple,
  SimpleClassData,
} from "../types";
import { formatDateToMySQLDate } from "../utils";
import {
  AllActiveClassesQuery,
  getAttendeeQuery,
  simpleClassTypesQuery,
  singleClassApiQuery,
  singleMenuQuery,
  singlePageQuery,
} from "../wordpress/queries";
import { PageRequest } from "../wordpress/types";
import {
  AllActiveClassesRequest,
  AttendeeRequest,
  MenuRequest,
  SimpleClassApiRequest,
  SimpleClassTypesRequest,
} from "../wordpress/types/request-types";
import {
  removeEdgesAndNodes,
  reshapeAttendeeData,
  reshapeClasses,
  reshapeMenu,
  reshapePage,
  reshapeSimpleClass,
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
  const response = await wordPressFetch<AllActiveClassesRequest>({
    query: AllActiveClassesQuery,
    variables: { today: formatDateToMySQLDate(new Date()) },
  });

  return reshapeClasses(removeEdgesAndNodes(response.body.data.classes));
};

export const getClassByIdSimple = async (
  id: number
): Promise<SimpleClassData> => {
  const response = await wordPressFetch<SimpleClassApiRequest>({
    query: singleClassApiQuery,
    variables: { id },
    cache: "no-store",
  });

  return reshapeSimpleClass(response.body.data.class);
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

export const getAttendeeById = async (id: number): Promise<AttendeeData> => {
  const response = await wordPressFetch<AttendeeRequest>({
    query: getAttendeeQuery,
    variables: { id },
  });

  return reshapeAttendeeData(response.body.data.attendee);
};
