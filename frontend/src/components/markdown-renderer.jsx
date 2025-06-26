"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import {
  FaCode,
  FaBold,
  FaHeading,
  FaList,
  FaQuoteLeft,
  FaLink,
  FaTable,
} from "react-icons/fa";

// Copy to clipboard hook
const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return { copied, copyToClipboard };
};

// Code block component with copy functionality
const CodeBlock = ({ children, className, ...props }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const code = String(children).replace(/\n$/, "");

  if (!match) {
    return (
      <code
        className="bg-gray-800 text-pink-400 px-2 py-1 rounded text-sm font-mono border border-gray-700"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-4">
      {/* Language label and copy button */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
        <div className="flex items-center gap-2">
          <FaCode className="text-blue-400 text-sm" />
          <span className="text-gray-300 text-sm font-medium capitalize">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={() => copyToClipboard(code)}
          className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="!mt-0 !rounded-t-none !rounded-b-lg !border-t-0"
        customStyle={{
          margin: 0,
          borderRadius: "0 0 0.5rem 0.5rem",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// Custom markdown components
const MarkdownComponents = {
  // Code blocks
  code: CodeBlock,

  // Headings with icons
  h1: ({ children }) => (
    <div className="flex items-center gap-3 my-6">
      <FaHeading className="text-blue-400 text-xl" />
      <h1 className="text-3xl font-bold text-white border-b border-gray-600 pb-2 flex-1">
        {children}
      </h1>
    </div>
  ),

  h2: ({ children }) => (
    <div className="flex items-center gap-3 my-5">
      <FaHeading className="text-blue-400 text-lg" />
      <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-1 flex-1">
        {children}
      </h2>
    </div>
  ),

  h3: ({ children }) => (
    <div className="flex items-center gap-2 my-4">
      <FaHeading className="text-blue-400 text-base" />
      <h3 className="text-xl font-semibold text-white">{children}</h3>
    </div>
  ),

  // Bold text
  strong: ({ children }) => (
    <span className="font-bold text-yellow-300 inline-flex items-center gap-1">
      <FaBold className="text-xs" />
      {children}
    </span>
  ),

  // Lists with icons
  ul: ({ children }) => (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-2">
        <FaList className="text-green-400 text-sm" />
        <span className="text-gray-400 text-sm">List</span>
      </div>
      <ul className="list-disc list-inside space-y-2 ml-4 text-gray-200">
        {children}
      </ul>
    </div>
  ),

  ol: ({ children }) => (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-2">
        <FaList className="text-green-400 text-sm" />
        <span className="text-gray-400 text-sm">Numbered List</span>
      </div>
      <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-200">
        {children}
      </ol>
    </div>
  ),

  // Blockquotes
  blockquote: ({ children }) => (
    <div className="my-4 border-l-4 border-purple-500 bg-gray-800/50 p-4 rounded-r-lg">
      <div className="flex items-center gap-2 mb-2">
        <FaQuoteLeft className="text-purple-400 text-sm" />
        <span className="text-gray-400 text-sm">Quote</span>
      </div>
      <blockquote className="text-gray-300 italic">{children}</blockquote>
    </div>
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline transition-colors"
    >
      <FaLink className="text-xs" />
      {children}
    </a>
  ),

  // Tables
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <div className="flex items-center gap-2 mb-2">
        <FaTable className="text-cyan-400 text-sm" />
        <span className="text-gray-400 text-sm">Table</span>
      </div>
      <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),

  th: ({ children }) => (
    <th className="px-4 py-3 bg-gray-700 text-left text-white font-semibold border-b border-gray-600">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-200 border-b border-gray-700">
      {children}
    </td>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="text-gray-200 leading-relaxed my-3">{children}</p>
  ),
};

// Main markdown renderer component
export const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
