import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToMySQLDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatPhysicalAddress(
  addressLine1: string,
  addressLine2: string | undefined,
  city: string,
  state: string,
  countryCode: string,
): string {
  return `${addressLine1}${
    addressLine2 ? ", " + addressLine2 : ""
  }, ${city}, ${state}, ${countryCode}`;
}

export function getImageClassesFromAttributes(
  attributes: Record<string, string | number | boolean>,
): string {
  const classes = [];
  if (attributes.className === "is-style-rounded") {
    classes.push("rounded-full");
  }
  if (attributes.scale === "cover") {
    classes.push("object-cover");
  } else {
    classes.push("object-contain");
  }
  return classes.join(" ");
}

export function getFontSizeForHeading(level: string | number): string {
  switch (level) {
    case "1":
    case 1:
      return "text-4xl";
    case "2":
    case 2:
      return "text-3xl";
    case "3":
    case 3:
      return "text-2xl";
    case "4":
    case 4:
      return "text-xl";
    case "5":
    case 5:
      return "text-lg";
    case "6":
    case 6:
      return "text-base";
    default:
      return "";
  }
}
