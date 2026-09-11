import type { BlogBlock } from '../../data/blogPosts';

/**
 * Renders a post's blocks.
 *
 * <p>Extracted from BlogPost so the admin preview draws through exactly the
 * same code the public page does. A preview that renders separately is a
 * preview that eventually disagrees with the article.
 */
export default function BlockContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return <h2 key={index} className="text-2xl font-bold text-deep-space-800 pt-5">{block.text}</h2>;
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="list-disc pl-6 space-y-2 text-deep-space-600">
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }
        return <p key={index} className="text-deep-space-600 leading-relaxed">{block.text}</p>;
      })}
    </div>
  );
}
