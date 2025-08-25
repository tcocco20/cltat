import React from "react";
import { Button } from "../ui/button";

interface ClassButtonProps {
  selected?: boolean;
}

const ClassButton = ({ selected }: ClassButtonProps) => {
  return (
    <Button
      variant={selected ? "default" : "ghost"}
      className="text-start w-full"
    >
      Jan. 23, 2026 - x seats available
    </Button>
  );
};

export default ClassButton;
