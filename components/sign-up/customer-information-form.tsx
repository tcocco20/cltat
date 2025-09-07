import React, { useTransition } from "react";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { userDetailsSchema } from "@/lib/validators";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { customerInformationDefaultValues } from "@/lib/default-values";
import useCustomerDetailsStore from "@/lib/store/customer-details-store";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface CustomerInformationFormProps {
  onChangeStep: (step: number) => void;
}

const CustomerInformationForm = ({
  onChangeStep,
}: CustomerInformationFormProps) => {
  const customerInfo = useCustomerDetailsStore((state) => state.customerInfo);
  const setCustomerInfo = useCustomerDetailsStore(
    (state) => state.setCustomerInfo
  );

  const form = useForm<z.infer<typeof userDetailsSchema>>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: customerInfo || customerInformationDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof userDetailsSchema>> = (
    data,
    event
  ) => {
    event?.preventDefault();

    startTransition(() => {
      setCustomerInfo({...data, countryCode: "US"});
      onChangeStep(2);
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Enter Your Information</DialogTitle>
        <DialogDescription>
          Please enter your information to sign up for the class.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-start">    
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "firstName"> }) => (
                        <FormItem className="w-full">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "lastName"> }) => (
                        <FormItem className="w-full">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-start">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "email"> }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "phone"> }) => (
                        <FormItem className="w-full">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="addressLineOne"
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "addressLineOne"> }) => (
                    <FormItem className="w-full">
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="addressLineTwo"
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "addressLineTwo"> }) => (
                    <FormItem className="w-full">
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex flex-wrap md:flex-nowrap gap-2 items-start">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "city"> }) => (
                        <FormItem className="w-full md:flex-3">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your city" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "state"> }) => (
                        <FormItem className="flex-1">
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. CA" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    disabled
                    name="countryCode"
                    render={({ field }: { field: ControllerRenderProps<z.infer<typeof userDetailsSchema>, "countryCode"> }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your country code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <DialogFooter>
            <DialogClose asChild>
                <Button variant="destructive" disabled={isPending}>
                Cancel
                </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
                Next Step
            </Button>
            </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default CustomerInformationForm;
