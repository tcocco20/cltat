import { BlockData } from "@/lib/types";

interface HeadingBlockProps {
  block: BlockData;
}

const HeadingBlock = ({ block }: HeadingBlockProps) => {
  console.log("HeadingBlock", block);
  return <h2 className="text-2xl">{block.attributes.content}</h2>;
};

export default HeadingBlock;
