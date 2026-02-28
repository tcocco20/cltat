import type { BlockData } from "@/lib/types";
import ParagraphBlock from "./paragraph-block";
import HeadingBlock from "./heading-block";
import Image from "next/image";
import { getImageClassesFromAttributes } from "@/lib/utils";
import { ColumnsBlock } from "./columns-block";
import { ColumnBlock } from "./column-block";
import ListBlock from "./list-block";
import ListItemBlock from "./list-item-block";

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
          case "core/image": {
            return (
              <Image
                key={block.id}
                style={{
                  aspectRatio: block.attributes.aspectRatio
                    ? (block.attributes.aspectRatio as string)
                    : "auto",
                }}
                className={getImageClassesFromAttributes(block.attributes)}
                src={block.attributes.url as string}
                height={block.attributes.height as number}
                width={block.attributes.width as number}
                alt={(block.attributes.alt as string) || ""}
              />
            );
          }
          case "core/columns": {
            return (
              <ColumnsBlock key={block.id} block={block}>
                <BlockRenderer blocks={block.innerBlocks} />
              </ColumnsBlock>
            );
          }
          case "core/column": {
            return (
              <ColumnBlock key={block.id} block={block}>
                <BlockRenderer blocks={block.innerBlocks} />
              </ColumnBlock>
            );
          }
          case "core/list": {
            return (
              <ListBlock key={block.id} block={block}>
                <BlockRenderer blocks={block.innerBlocks} />
              </ListBlock>
            );
          }
          case "core/list-item": {
            return <ListItemBlock key={block.id} block={block} />;
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
