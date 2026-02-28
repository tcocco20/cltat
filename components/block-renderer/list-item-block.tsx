import { BlockData } from "@/lib/types";

interface ListItemBlockProps {
  block: BlockData;
}

const ListItemBlock = ({ block }: ListItemBlockProps) => {
  return <li>{block.attributes.content}</li>;
};

export default ListItemBlock;
