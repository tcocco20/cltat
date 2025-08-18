import type { BlockData } from "@/lib/types";
import ParagraphBlock from "./paragraph-block";
import HeadingBlock from "./heading-block";

interface BlockRendererProps {
  blocks: BlockData[];
}
const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  return (
    <>
      {blocks.map((block) => {
        switch (block.name) {
          case "core/paragraph": {
            return <ParagraphBlock key={block.id} block={block} />;
          }
          case "core/heading": {
            return <HeadingBlock key={block.id} block={block} />;
          }
          default: {
            return null;
          }
        }
      })}
    </>
  );
};

export default BlockRenderer;
