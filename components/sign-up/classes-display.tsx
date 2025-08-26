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

interface ClassesDisplayProps {
  onSelectClass: (classId: string) => void;
}

const ClassesDisplay = ({ onSelectClass }: ClassesDisplayProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
        <CardDescription>Select a class to view more details</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" defaultValue="item-1" collapsible>
          <ClassTypeSection classType="item-1" onSelectClass={onSelectClass} />
          <ClassTypeSection classType="item-2" onSelectClass={onSelectClass} />
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClassesDisplay;
