import z from "zod";
import {
  freeClassSignUpSchema,
  userDetailsSchema,
  userIdentificationSchema,
} from "../validators";

export interface PageData {
  blocks: BlockData[];
  title: string;
  bannerImage: WPImage | null;
}

export interface LinkData {
  title: string;
  href: string;
}

export interface BlockData {
  id: string;
  name: string;
  attributes: Record<string, string | number | boolean>;
  innerBlocks: BlockData[];
}

export interface WPImage {
  altText: string | null;
  url: string;
  height: number;
  width: number;
}

export type Menu = LinkData[];

export interface ClassData {
  id: number;
  description: string;
  date: Date;
  endDate: Date | null;
  isRemote: boolean;
  location: string;
  spotsTaken: number;
  totalSpots: number;
  type: string;
  typeSlug: string;
  cost: number;
  isPaid: boolean;
}

export interface ClassType {
  name: string;
  description: string;
  subtitle: string;
  slug: string;
}

export interface ClassTypeSimple {
  name: string;
  slug: string;
}

export interface SimpleClassData {
  spotsTaken: number;
  totalSpots: number;
  date: Date;
  cost: number;
}

export type CustomerInfo = z.infer<typeof userDetailsSchema>;
export type CustomerIdentification = z.infer<typeof userIdentificationSchema>;

export type CustomerDetails = CustomerInfo & CustomerIdentification;
export type FreeCustomerDetails = z.infer<typeof freeClassSignUpSchema>;

export interface AttendeeData {
  id: number;
  fullName: string;
  receiptUrl: string;
  paymentId: string;
  orderId: string;
  classData: ClassData;
}

export interface InstructorData {
  name: string;
  bio: string;
  image: WPImage | null;
}

export interface LicenseData {
  title: string;
  slug: string;
  mediaItemUrl: string;
  fileName: string;
}
