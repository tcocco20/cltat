import { randomUUID } from "crypto";
import {
  AttendeeData,
  BlockData,
  ClassData,
  ClassType,
  InstructorData,
  LicenseData,
  Menu,
  PageData,
  SimpleClassData,
  WPImage,
} from "../types";
import {
  Connection,
  PageResponse,
  WordPressBlock,
  WordPressClass,
  WordPressClassType,
  WordPressImage,
  WordPressInstructor,
  WordPressLicense,
} from "./types";
import {
  AttendeeResponse,
  MenuResponse,
  SimpleClassApiResponse,
} from "./types/response-types";

export function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
  return array.edges.map((edge) => edge?.node);
}

export function reshapeImage(image: WordPressImage | null): WPImage | null {
  if (!image) return null;

  return {
    altText: image.altText,
    url: image.mediaItemUrl,
    height: image.mediaDetails.height,
    width: image.mediaDetails.width,
  };
}

export const reshapePage = (page: PageResponse): PageData | null => {
  if (!page) return null;

  return {
    blocks: reshapeBlocks(page.blocks),
    title: page.title,
    bannerImage: reshapeImage(page.pageBanner.pageBanner),
  };
};

export const reshapeBlocks = (blocks: WordPressBlock[]) => {
  const assignIds = (block: WordPressBlock[]): BlockData[] => {
    return block.map((b) => ({
      ...b,
      id: randomUUID(),
      innerBlocks: b.innerBlocks?.length ? assignIds(b.innerBlocks) : [],
    }));
  };

  return assignIds(blocks);
};

export const reshapeMenu = (menu: MenuResponse): Menu | null => {
  if (!menu || !menu.menuItems) return null;

  const reshapedMenu = removeEdgesAndNodes(menu.menuItems);

  return reshapedMenu.map((item) => ({
    title: item.label,
    href: item.path,
  }));
};

export const reshapeClass = (cls: WordPressClass): ClassData => {
  const classTypeData = removeEdgesAndNodes(cls.classTypes)[0];

  return {
    id: cls.databaseId,
    description: cls.classInformation.description,
    date: new Date(cls.classInformation.classDateTime),
    isRemote: cls.classInformation.isRemote,
    location: cls.classInformation.classLocation,
    spotsTaken: cls.classData.spotsTaken ?? 0,
    totalSpots: cls.classData.totalSpots,
    type: classTypeData.name,
    typeSlug: classTypeData.slug,
    cost: classTypeData.paymentInformation.cost,
  };
};

export const reshapeSimpleClass = (
  cls: SimpleClassApiResponse
): SimpleClassData => {
  const classTypeData = removeEdgesAndNodes(cls.classTypes)[0];

  return {
    spotsTaken: cls.classData.spotsTaken ?? 0,
    totalSpots: cls.classData.totalSpots,
    date: new Date(cls.classInformation.classDateTime),
    cost: classTypeData.paymentInformation.cost,
  };
};

export const reshapeClasses = (classes: WordPressClass[]): ClassData[] => {
  if (!classes || classes.length === 0) return [];

  return classes.map((cls) => reshapeClass(cls));
};

export const reshapeAttendeeData = (
  attendee: AttendeeResponse
): AttendeeData => {
  return {
    id: attendee.databaseId,
    fullName: attendee.attendeeInformation.fullName,
    receiptUrl: attendee.attendeeInformation.receiptUrl,
    paymentId: attendee.attendeeInformation.paymentId,
    orderId: attendee.attendeeInformation.orderId,
    classData: reshapeClass(attendee.attendeeInformation.class),
  };
};

export const reshapeClassTypes = (
  classTypes: WordPressClassType[]
): ClassType[] => {
  if (!classTypes || classTypes.length === 0) return [];

  console.log(classTypes);

  return classTypes.map((type) => ({
    name: type.name,
    description: type.description,
    subtitle: type.subtitle.subtitle,
    slug: type.slug,
  }));
};

export const reshapeInstructors = (
  instructors: WordPressInstructor[]
): InstructorData[] => {
  if (!instructors || instructors.length === 0) return [];

  return instructors.map((instructor) => ({
    name: instructor.title,
    bio: instructor.instructorBio.instructorBio,
    image: reshapeImage(instructor.featuredImage.node),
  }));
};

export const reshapeLicenses = (
  licenses: WordPressLicense[]
): LicenseData[] => {
  if (!licenses || licenses.length === 0) return [];

  return licenses.map((license) => ({
    title: license.title,
    slug: license.slug,
    mediaItemUrl: license.licenseFile.file.mediaItemUrl,
    fileName: license.licenseFile.file.title,
  }));
};
