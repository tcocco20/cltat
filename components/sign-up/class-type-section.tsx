import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ClassButton from "./class-button";
import { ClassData, ClassTypeSimple } from "@/lib/types";
import RequestInfoButton from "../general/request-info-button";

interface ClassTypeSectionProps {
  classType: ClassTypeSimple;
  classes?: ClassData[];
  onSelectClass: (classId: number) => void;
}

const ClassTypeSection = ({
  classType,
  classes,
  onSelectClass,
}: ClassTypeSectionProps) => {
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
      <RequestInfoButton>Contact Us</RequestInfoButton>
    </>
  );
  return (
    <AccordionItem value={classType.slug}>
      <AccordionTrigger>{classType.name}</AccordionTrigger>
      <AccordionContent className="space-y-2 overflow-y-auto max-h-[300px]">
        {classes?.length
          ? classes.map((classData) => (
              <ClassButton
                key={classData.id}
                date={classData.date.toDateString()}
                spotsAvailable={classData.totalSpots - classData.spotsTaken}
                onClick={() => onSelectClass(classData.id)}
              />
            ))
          : emptyContent}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ClassTypeSection;
