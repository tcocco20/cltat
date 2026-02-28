import { BlockData } from "@/lib/types";
import type { CSSProperties, ReactNode } from "react";

interface ColumnProps {
  block: BlockData;
  children: ReactNode;
}

export const ColumnBlock = ({ block, children }: ColumnProps) => {
  const widthStyle = block.attributes.width
    ? { minWidth: block.attributes.width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };
  return (
    <div style={{ ...widthStyle } as CSSProperties} className="px-2 py-5">
      {children}
    </div>
  );
};
