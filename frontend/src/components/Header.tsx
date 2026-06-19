import { Sparkles, Share2, MoreHorizontal } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 px-5 sm:px-8 py-3.5 glass-strong border-b border-white/10">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center lg:hidden">
            <BrainMini />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Untagged conversation</p>
            <p className="text-[11px] text-zinc-500">GPT-4o · RAG enabled</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition-colors text-xs font-medium text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF]" />
            <span className="hidden sm:inline">Upgrade</span>
          </button>
          <button className="w-8 h-8 rounded-lg glass hover:bg-white/10 transition-colors flex items-center justify-center">
            <Share2 className="w-4 h-4 text-zinc-300" />
          </button>
          <button className="w-8 h-8 rounded-lg glass hover:bg-white/10 transition-colors flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-zinc-300" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#6FB1FF] flex items-center justify-center text-xs font-bold text-white ml-1">
            AK
          </div>
        </div>
      </div>
    </header>
  );
}

function BrainMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
      <path d="M9 3a3 3 0 0 0-3 3v.5A2.5 2.5 0 0 0 4 9c0 1 .5 1.8 1.2 2.3A2.5 2.5 0 0 0 6 16a2.5 2.5 0 0 0 3 2.4V3Z" fill="currentColor" opacity="0.9" />
      <path d="M15 3a3 3 0 0 1 3 3v.5A2.5 2.5 0 0 1 20 9c0 1-.5 1.8-1.2 2.3A2.5 2.5 0 0 1 18 16a2.5 2.5 0 0 1-3 2.4V3Z" fill="currentColor" />
    </svg>
  );
}
