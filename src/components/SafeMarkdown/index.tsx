import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div className='prose prose-slate overflow:hidden prose-a:text-blue-500 prose-a:transition prose-a:hover:text-blue-700 prose-a:no-underline prose-a:hover:underline prose-img:mx-auto md:prose-lg w-full max-w-none'>
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
