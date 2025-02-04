import ReactMarkdown from "react-markdown";

const MarkdownParser = ({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties; 
}) => {
  return (
    <span className={`markdown_content ${className}`} style={style}>
      <ReactMarkdown
        components={{
          a: ({ href, children }: { href: string; children: any }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </span>
  );
};

export default MarkdownParser;
