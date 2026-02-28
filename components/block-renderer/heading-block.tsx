import { BlockData } from "@/lib/types";
import { getFontSizeForHeading } from "@/lib/utils";

interface HeadingBlockProps {
  block: BlockData;
}

const HeadingBlock = ({ block }: HeadingBlockProps) => {
  return (
    <h2
      className={`my-5 ${getFontSizeForHeading(
        block.attributes.level as number,
      )} font-semibold`}
    >
      {block.attributes.content}
    </h2>
  );
};

export default HeadingBlock;
