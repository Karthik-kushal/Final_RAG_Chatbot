import { suggestionPrompts, emptyStateSources } from '../data/mockData';
import { SourceCard } from './SourceCard';
import { FileSearch, Sparkles, ArrowRight } from 'lucide-react';

type Props = {
  onPick: (prompt: string) => void;
};

export default function EmptyState({ onPick }: Props) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-10 max-w-2xl mx-auto animate-fade-in">
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-3xl bg-[#4F8CFF]/30 blur-3xl animate-pulse-glow" />
        <div className="relative w-20 h-20 rounded-3xl glass-strong flex items-center justify-center animate-float">
          <FileSearch className="w-9 h-9 text-[#4F8CFF]" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
        Ask anything across your documents
      </h2>
      <p className="text-sm text-zinc-400 mt-2.5 max-w-md leading-relaxed">
        DocMind AI retrieves the most relevant passages from your indexed library
        and synthesizes a grounded answer with source citations.
      </p>

      {/* Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mt-7">
        {suggestionPrompts.map((prompt, i) => (
          <button
            key={prompt}
            onClick={() => onPick(prompt)}
            className="group glass rounded-xl p-3.5 text-left hover-lift hover:border-[#4F8CFF]/40 transition-all stagger-${i}"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#4F8CFF]/20 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#4F8CFF] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-200 leading-snug">{prompt}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#4F8CFF] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* Recent sources */}
      <div className="w-full mt-9">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Recently Indexed
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {emptyStateSources.slice(0, 2).map((src, i) => (
            <SourceCard key={src.id} source={src} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
