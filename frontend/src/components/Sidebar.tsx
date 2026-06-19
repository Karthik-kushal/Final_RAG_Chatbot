import { useState } from 'react';
import {
  stats,
  retrievalSettings,
  statusBadge,
} from '../data/mockData';
import { ChevronDown, Plug, Plus } from 'lucide-react';

type SidebarProps = {
  activeQuery: string | null;
  onNewChat: () => void;
};

export default function Sidebar({ activeQuery, onNewChat }: SidebarProps) {
  const [openSettings, setOpenSettings] = useState<string | null>(retrievalSettings[0].id);
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(retrievalSettings.map((s) => [s.id, s.default]))
  );

  return (
    <aside className="hidden lg:flex flex-col w-[320px] shrink-0 h-screen sticky top-0 glass-strong border-r border-white/10">
      {/* Brand */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center glow-accent">
              <BrainIcon />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0B1220]" />
          </div>
          <div>
            <h1 className="text-[17px] font-bold tracking-tight text-white leading-none">
              DocMind <span className="text-[#4F8CFF]">AI</span>
            </h1>
            <p className="text-[11px] text-zinc-400 mt-1">Document Intelligence</p>
          </div>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mt-4">
          RAG-powered insights across your entire document library.
        </p>
      </div>

      {/* New chat */}
      <div className="px-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-accent text-white text-sm font-semibold hover:opacity-90 transition-all glow-accent"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 mt-2">
        {/* Stats */}
        <div className="space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-2">
            Overview
          </h2>
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className="glass rounded-2xl p-4 hover-lift hover:border-white/20 stagger-${i}"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-[#4F8CFF]" />
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400"
                >
                  LIVE
                </span>
              </div>
              <p className="text-xl font-bold text-white mt-3 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">{stat.label}</p>
              <p className="text-[11px] text-zinc-500 mt-2 pt-2 border-t border-white/5">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Retrieval settings */}
        <div className="space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-2">
            Retrieval Settings
          </h2>
          {retrievalSettings.map((setting) => {
            const isOpen = openSettings === setting.id;
            return (
              <div
                key={setting.id}
                className="glass rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenSettings(isOpen ? null : setting.id)}
                  className="w-full flex items-center gap-3 p-3.5 hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <setting.icon className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {setting.label}
                    </p>
                    <p className="text-[10px] text-zinc-500 truncate">
                      {setting.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 animate-fade-in">
                    <div className="flex flex-wrap gap-1.5">
                      {setting.options.map((opt) => {
                        const isSel = selected[setting.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() =>
                              setSelected((p) => ({ ...p, [setting.id]: opt }))
                            }
                            className={`text-[11px] px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                              isSel
                                ? 'gradient-accent text-white'
                                : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status footer */}
      <div className="px-4 py-4 border-t border-white/5">
        <div className="glass rounded-2xl p-3.5 flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 rounded-full bg-emerald-400 ping-slow" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">{statusBadge.label}</p>
            <p className="text-[10px] text-zinc-500">99.98% uptime</p>
          </div>
          <Plug className="w-4 h-4 text-zinc-600" />
        </div>
      </div>
    </aside>
  );

  function BrainIcon() {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5 text-white"
      >
        <path
          d="M9 3a3 3 0 0 0-3 3v.5A2.5 2.5 0 0 0 4 9c0 1 .5 1.8 1.2 2.3A2.5 2.5 0 0 0 6 16a2.5 2.5 0 0 0 3 2.4V3Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M15 3a3 3 0 0 1 3 3v.5A2.5 2.5 0 0 1 20 9c0 1-.5 1.8-1.2 2.3A2.5 2.5 0 0 1 18 16a2.5 2.5 0 0 1-3 2.4V3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
