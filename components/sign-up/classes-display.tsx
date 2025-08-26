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

const ClassesDisplay = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
        <CardDescription>Select a class to view more details</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" defaultValue="item-1" collapsible>
          <ClassTypeSection classType="item-1" />
          <ClassTypeSection classType="item-2" />
          <ClassTypeSection classType="item-3" />
          <ClassTypeSection classType="item-4" />
          <ClassTypeSection classType="item-5" />
          <ClassTypeSection classType="item-6" />
          <ClassTypeSection classType="item-7" />
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClassesDisplay;
