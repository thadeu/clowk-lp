import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import hcl from 'react-syntax-highlighter/dist/esm/languages/prism/hcl';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('hcl', hcl);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('ruby', ruby);

type Props = { code: string; lang: string; wrap?: boolean; className?: string; fontSize?: string };

/** A highlighted code block on a transparent background (Prism, One Dark). */
export default function Code({ code, lang, wrap = false, className = '', fontSize = '13px' }: Props) {
  return (
    <SyntaxHighlighter
      language={lang}
      style={oneDark}
      wrapLongLines={wrap}
      className={className}
      customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize, lineHeight: '1.65', textShadow: 'none' }}
      codeTagProps={{ style: { background: 'transparent', textShadow: 'none', fontFamily: 'var(--font-mono, ui-monospace, monospace)' } }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
