import type { BlockData } from "@/lib/types";
import type { ReactNode } from "react";

interface ColumnsBlockProps {
  block: BlockData;
  children: ReactNode;
}

export const ColumnsBlock = ({ block, children }: ColumnsBlockProps) => {
  return (
    <div className="my-10">
      <div
        className={`max-w-5xl mx-auto ${
          block.attributes.isStackedOnMobile ? "block md:flex" : "flex"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
