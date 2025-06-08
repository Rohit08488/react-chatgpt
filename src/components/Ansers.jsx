import { useEffect, useState } from "react";
import { replacehadingstars, checkhading } from "./helper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stringify } from "postcss";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const Answers = ({ ans, totalResult, index, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkhading(ans)) {
      setHeading(true);
      setAnswer(replacehadingstars(ans));
    }
  }, []);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          language={match[1]}
          style={dark}
          PreTag="div"
        >
          {children.trimEnd()}
        </SyntaxHighlighter>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index == 0 && totalResult > 1 ? (
        <span className="pt-2 text-lg block text-white">{answer}</span>
      ) : heading ? (
        <span className="pt-2 text-lg block text-white">{answer}</span>
      ) : (
        <span className={type == "q" ? "pl-1" : "pl-5"}>
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </span>
      )}
    </>
  );
};
export default Answers;
