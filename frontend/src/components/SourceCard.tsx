import { useState } from 'react';
import type { Source } from '../data/mockData';
import {
  FileText,
  ChevronDown,
  ExternalLink,
  Bookmark,
  type LucideIcon,
} from 'lucide-react';

const typeBadge: Record<Source['type'], { color: string; icon: LucideIcon }> = {
  PDF: { color: 'text-rose-400 bg-rose-400/10', icon: FileText },
  DOCX: { color: 'text-sky-400 bg-sky-400/10', icon: FileText },
  MD: { color: 'text-zinc-300 bg-white/10', icon: FileText },
};

export function SourceCard({ source, index }: { source: Source; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const badge = typeBadge[source.type];

  return (
    <div
      className="glass rounded-xl overflow-hidden hover-lift hover:border-[#4F8CFF]/30 group"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-3 p-3 text-left"
      >
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${badge.color}`}
        >
          <badge.icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">
            {source.filename}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-zinc-500">Page {source.page}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-[10px] text-emerald-400 font-medium">
              {(source.score * 100).toFixed(0)}% match
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-500 transition-transform shrink-0 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="px-3 pb-3 pt-0 animate-fade-in">
          <div className="text-[11px] text-zinc-400 leading-relaxed bg-white/[0.03] rounded-lg p-2.5 border-l-2 border-[#4F8CFF]/40">
            {source.snippet}
          </div>
          <div className="flex items-center gap-2 mt-2.5">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[11px] font-medium text-zinc-300">
              <ExternalLink className="w-3 h-3" />
              Open
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[11px] font-medium text-zinc-300">
              <Bookmark className="w-3 h-3" />
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
