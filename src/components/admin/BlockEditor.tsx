import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import type { BlogBlock } from '../../data/blogPosts';

/**
 * Edits the three block kinds the renderer understands, and nothing else.
 *
 * <p>There is no rich-text field and no HTML input anywhere: the editor can
 * only produce shapes the API already validates, which is why no part of this
 * system has to sanitise markup on the way in or out.
 */
export default function BlockEditor({ blocks, onChange }: {
  blocks: BlogBlock[];
  onChange: (next: BlogBlock[]) => void;
}) {
  const replace = (i: number, block: BlogBlock) =>
    onChange(blocks.map((b, index) => (index === i ? block : b)));

  const move = (i: number, by: number) => {
    const to = i + by;
    if (to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[to]] = [next[to], next[i]];
    onChange(next);
  };

  const add = (type: BlogBlock['type']) =>
    onChange([...blocks, type === 'list' ? { type, items: [''] } : { type, text: '' }]);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <div key={i} className="rounded-xl border border-warm-sand-300/60 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-harvest-gold-600">
              {block.type}
            </span>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                aria-label="Move block up"
                className="p-1.5 rounded hover:bg-warm-sand-100 disabled:opacity-30">
                <ArrowUp className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1}
                aria-label="Move block down"
                className="p-1.5 rounded hover:bg-warm-sand-100 disabled:opacity-30">
                <ArrowDown className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => onChange(blocks.filter((_, index) => index !== i))}
                aria-label="Delete block"
                className="p-1.5 rounded hover:bg-red-50 text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {block.type === 'list' ? (
            <div className="space-y-2">
              {block.items.map((item, j) => (
                <div key={j} className="flex gap-2">
                  <input
                    value={item}
                    onChange={(e) => replace(i, {
                      ...block,
                      items: block.items.map((it, index) => (index === j ? e.target.value : it)),
                    })}
                    className="flex-1 rounded-lg border border-warm-sand-300 px-3 py-2 text-sm"
                    placeholder={`Item ${j + 1}`}
                  />
                  <button type="button" aria-label="Remove item"
                    onClick={() => replace(i, { ...block, items: block.items.filter((_, index) => index !== j) })}
                    className="px-2 rounded hover:bg-red-50 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => replace(i, { ...block, items: [...block.items, ''] })}
                className="text-sm font-semibold text-harvest-gold-600 hover:underline">
                + Add item
              </button>
            </div>
          ) : (
            <textarea
              value={block.text}
              onChange={(e) => replace(i, { ...block, text: e.target.value })}
              rows={block.type === 'heading' ? 1 : 4}
              className="w-full rounded-lg border border-warm-sand-300 px-3 py-2 text-sm"
              placeholder={block.type === 'heading' ? 'Heading' : 'Paragraph text'}
            />
          )}
        </div>
      ))}

      <div className="flex gap-2">
        {(['paragraph', 'heading', 'list'] as const).map((type) => (
          <button key={type} type="button" onClick={() => add(type)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-warm-sand-300 px-3 py-2 text-sm font-semibold hover:bg-warm-sand-100">
            <Plus className="w-4 h-4" /> {type}
          </button>
        ))}
      </div>
    </div>
  );
}
