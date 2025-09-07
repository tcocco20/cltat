import useCustomerDetailsStore from "@/lib/store/customer-details-store";
import { Button } from "../ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { userIdentificationSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useTransition } from "react";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface CustomerIdentificationFormProps {
  onChangeStep: (step: number) => void;
}

const CustomerIdentificationForm = ({
  onChangeStep,
}: CustomerIdentificationFormProps) => {
  const customerIdentification = useCustomerDetailsStore(
    (state) => state.customerIdentification
  );
  const setCustomerIdentification = useCustomerDetailsStore(
    (state) => state.setCustomerIdentification
  );

  const form = useForm<z.infer<typeof userIdentificationSchema>>({
    resolver: zodResolver(userIdentificationSchema),
    defaultValues: customerIdentification || {},
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof userIdentificationSchema>> = (
    data,
    event
  ) => {
    event?.preventDefault();

    startTransition(() => {
      setCustomerIdentification(data);
      onChangeStep(3);
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Identification Information</DialogTitle>
        <DialogDescription>
          Provide your identification details to proceed.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="DPSST_PSID"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>DPSST PSID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your DPSST PSID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photoId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Photo ID</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Enter your Photo ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => onChangeStep(1)}>
              Back
            </Button>
            <Button type="submit">Next Step</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default CustomerIdentificationForm;
