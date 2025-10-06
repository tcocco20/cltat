import { z } from "zod";

export const userDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  phone: z
    .string()
    .regex(
      /^\d{10}$/,
      "Please enter phone number without dashes or spaces e.g. (1234567890)"
    ),
  addressLineOne: z.string().min(1, "Address is required"),
  addressLineTwo: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "Invalid state code").max(2, "Invalid state code"),
  countryCode: z.string().min(2).max(2, "Invalid country code"),
});

export const userIdentificationSchema = z
  .object({
    dateOfBirth: z
      .date()
      .min(new Date("1900-01-01"), "Invalid date of birth")
      .max(new Date(), "Date of birth cannot be in the future"),
    DPSST_PSID: z.string().optional(),
    photoId: z
      .number("photoId must be a number")
      .min(1, "Photo ID is required"),
    sourceUrl: z.url(),
    height: z.number().optional(),
    width: z.number().optional(),
  })
  .refine((data) => !!data.sourceUrl, {
    message: "Source URL is required",
    path: ["photoId"],
  });

export const freeClassSignUpSchema = z.object({
  ...userDetailsSchema.shape,
  dateOfBirth: userIdentificationSchema.shape.dateOfBirth,
});
