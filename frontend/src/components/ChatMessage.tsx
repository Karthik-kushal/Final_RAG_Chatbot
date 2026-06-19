import { useState } from 'react';
import type { ChatMessage as Msg } from '../data/mockData';
import { SourceCard } from './SourceCard';
import { Bot, User, Copy, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';

type Props = {
  message: Msg;
  index: number;
};

export default function ChatMessage({ message, index }: Props) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(message.content.replace(/\*\*/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p
          key={i}
          className={line.trim() === '' ? 'h-2' : ''}
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <div
      className={`flex gap-3 sm:gap-4 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      } animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10'
            : 'gradient-accent glow-accent'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-zinc-200" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-3 max-w-[85%] sm:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-br from-[#4F8CFF] to-[#3a6fd0] text-white rounded-tr-sm shadow-lg shadow-[#4F8CFF]/20'
              : 'glass text-zinc-100 rounded-tl-sm'
          }`}
        >
          <div className="space-y-1">{renderContent(message.content)}</div>
        </div>

        {/* Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {message.sources.length} Sources Retrieved
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {message.sources.map((src, i) => (
                <SourceCard key={src.id} source={src} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Action bar */}
        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100">
            <ActionBtn icon={Copy} label={copied ? 'Copied!' : 'Copy'} onClick={handleCopy} active={copied} />
            <ActionBtn icon={ThumbsUp} label="Helpful" />
            <ActionBtn icon={ThumbsDown} label="Not helpful" />
            <ActionBtn icon={RefreshCw} label="Regenerate" />
          </div>
        )}
      </div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: typeof Copy;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] transition-all ${
        active
          ? 'text-[#4F8CFF]'
          : 'text-zinc-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-3 h-3" />
    </button>
  );
}
