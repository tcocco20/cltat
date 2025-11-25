import styles from "./wysiwyg-renderer.module.css";
interface WysiwygRendererProps {
  htmlToRender: string;
  className?: string;
}

const WysiwygRenderer = ({ htmlToRender, className }: WysiwygRendererProps) => {
  return (
    <div
      className={`${styles.wysiwygContainer} ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: htmlToRender }}
    />
  );
};

export default WysiwygRenderer;
