import { BlockData } from "@/lib/types";

interface ParagraphBlockProps {
  block: BlockData;
}
const ParagraphBlock = ({ block }: ParagraphBlockProps) => {
  return <p className="my-8">{block.attributes.content}</p>;
};

export default ParagraphBlock;
