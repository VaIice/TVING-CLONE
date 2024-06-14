declare module 'react-highlight-words' {
  import * as React from 'react';

  interface HighlighterProps {
    autoEscape?: boolean;
    highlightClassName?: string;
    highlightStyle?: React.CSSProperties;
    sanitize?: (text: string) => string;
    searchWords: string[];
    textToHighlight: string;
    caseSensitive?: boolean;
    unhighlightClassName?: string;
    unhighlightStyle?: React.CSSProperties;
    highlightTag?: React.ElementType;
  }

  const Highlighter: React.FC<HighlighterProps>;

  export default Highlighter;
}