"use client";
import { useState } from "react";
import ClassesDisplay from "./classes-display";
import SelectedClassInfo from "./selected-class-info";
import { ClassData, ClassTypeSimple } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface ClassSelectorProps {
  classes: ClassData[];
  classTypes: ClassTypeSimple[];
}

const ClassSelector = ({ classes, classTypes }: ClassSelectorProps) => {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  const noClassesMessage = (
    <Card className="md:col-span-3 md:col-start-2 text-center">
      <CardHeader>
        <CardTitle>No Classes Available</CardTitle>
        <CardDescription>
          It seems there are no classes available at the moment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          If you believe this is an error, please check your internet connection
          or try refreshing the page. Otherwise, please check back later for
          updates. If you have any questions, feel free to contact us.
        </p>
        <Button>Contact Us</Button>
      </CardContent>
    </Card>
  );

  const handleSelectClass = (classId: number) => {
    setSelectedClass(classes.find((cls) => cls.id === classId) || null);
  };

  return (
    <section className="container max-w-5xl px-2 sm:px-0 grid md:grid-cols-5 gap-4">
      {classes.length > 0 ? (
        <>
          <div className="md:col-span-2">
            <ClassesDisplay
              onSelectClass={handleSelectClass}
              classTypes={classTypes}
              classes={classes}
            />
          </div>
          <div className="md:col-span-3 h-full">
            <SelectedClassInfo selectedClass={selectedClass} />
          </div>
        </>
      ) : (
        noClassesMessage
      )}
    </section>
  );
};

export default ClassSelector;
