"use client";
import { useState } from "react";
import ClassesDisplay from "./classes-display";
import SelectedClassInfo from "./selected-class-info";
import { ClassData } from "@/lib/types";

const ClassSelector = () => {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  const handleSelectClass = (classId: string) => {
    console.log("Selected class ID:", classId);
    setSelectedClass(null);
  };
  return (
    <section className="container max-w-5xl px-2 sm:px-0 grid md:grid-cols-5 gap-4">
      <div className="md:col-span-2">
        <ClassesDisplay onSelectClass={handleSelectClass} />
      </div>
      <div className="md:col-span-3 h-full">
        <SelectedClassInfo selectedClass={selectedClass} />
      </div>
    </section>
  );
};

export default ClassSelector;
