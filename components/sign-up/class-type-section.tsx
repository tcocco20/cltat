import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ClassButton from "./class-button";
import { Button } from "../ui/button";
import { ClassData } from "@/lib/types";

interface ClassTypeSectionProps {
  classType: string;
  classes?: ClassData[];
}

const ClassTypeSection = ({ classType, classes }: ClassTypeSectionProps) => {
  const emptyContent = (
    <>
      <div className="text-center pt-4">
        <h3 className="text-lg font-medium">
          No classes available at this time.
        </h3>
        <p className="text-muted-foreground">
          Please check back later for updates. If you have any questions, feel
          free to contact us.
        </p>
      </div>
      <Button variant="outline" className="w-full mb-4">
        Contact Us
      </Button>
    </>
  );
  return (
    <AccordionItem value={classType}>
      <AccordionTrigger>{`Class Type ${classType}`}</AccordionTrigger>
      <AccordionContent className="space-y-2 overflow-y-auto max-h-[300px]">
        {classes?.length
          ? classes.map((classData) => <ClassButton key={classData.id} />)
          : emptyContent}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ClassTypeSection;
