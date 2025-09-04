import { z } from "zod";

const userDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  addressLines: z.array(z.string().min(1)).min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2).max(2, "Invalid state code"),
  countryCode: z.string().min(2).max(2, "Invalid country code").default("US"),
});
