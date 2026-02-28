import { BlockData } from "@/lib/types";
import { ReactNode } from "react";

interface ListBlockProps {
  block: BlockData;
  children?: ReactNode;
}

const ListBlock = ({ block, children }: ListBlockProps) => {
  if (block.attributes?.ordered) {
    return <ol className="pl-8 list-decimal">{children}</ol>;
  } else {
    return <ul className="pl-8 list-disc">{children}</ul>;
  }
};

export default ListBlock;
