import { BlockData } from "@/lib/types";
import { getFontSizeForHeading } from "@/lib/utils";
import { JSX } from "react";

interface HeadingBlockProps {
  block: BlockData;
}

const HeadingBlock = ({ block }: HeadingBlockProps) => {
  const rawLevel = Number(block.attributes.level);
  const safeLevel =
    Number.isFinite(rawLevel) && rawLevel >= 1 && rawLevel <= 6 ? rawLevel : 2;
  const HeadingTag = `h${safeLevel}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      className={`my-5 ${getFontSizeForHeading(
        block.attributes.level as number,
      )} font-semibold`}
    >
      {block.attributes.content}
    </HeadingTag>
  );
};

export default HeadingBlock;
