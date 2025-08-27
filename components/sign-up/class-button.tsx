import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ClassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  date: string;
  spotsAvailable: number;
}

const ClassButton = ({
  selected,
  className,
  date,
  spotsAvailable,
  ...props
}: ClassButtonProps) => {
  return (
    <Button
      variant={selected ? "default" : "ghost"}
      className={cn("text-start w-full", className)}
      {...props}
    >
      {date} - {spotsAvailable} spots available
    </Button>
  );
};

export default ClassButton;
