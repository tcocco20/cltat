import { BlockData } from "@/lib/types";

interface ParagraphBlockProps {
  block: BlockData;
}
const ParagraphBlock = ({ block }: ParagraphBlockProps) => {
  //   console.log("Rendering ParagraphBlock with block data:", block);
  return <p>{block.attributes.content}</p>;
};

export default ParagraphBlock;
