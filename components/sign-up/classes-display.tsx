import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Accordion } from "../ui/accordion";
import ClassTypeSection from "./class-type-section";
import { ClassData, ClassTypeSimple } from "@/lib/types";

interface ClassesDisplayProps {
  classTypes: ClassTypeSimple[];
  classes: ClassData[];
  onSelectClass: (classId: number) => void;
}

const ClassesDisplay = ({
  classTypes,
  classes,
  onSelectClass,
}: ClassesDisplayProps) => {
  const displayClasses = () =>
    classTypes.map((classType) => (
      <ClassTypeSection
        key={classType.slug}
        classType={classType}
        classes={classes.filter((cls) => cls.typeSlug === classType.slug)}
        onSelectClass={onSelectClass}
      />
    ));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
        <CardDescription>Select a class to view more details</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" defaultValue={classTypes[0].slug} collapsible>
          {displayClasses()}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClassesDisplay;
