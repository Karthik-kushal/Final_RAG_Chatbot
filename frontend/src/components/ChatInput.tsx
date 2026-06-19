import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Paperclip, Mic, Square } from 'lucide-react';

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
  onStop?: () => void;
  isGenerating?: boolean;
};

export default function ChatInput({ onSend, disabled, onStop, isGenerating }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  }, [value]);

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="px-4 sm:px-6 pb-5 pt-3 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/95 to-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="glass-strong rounded-2xl p-2 flex items-end gap-2 focus-within:border-[#4F8CFF]/50 transition-colors shadow-2xl shadow-black/40">
          <button className="w-9 h-9 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center text-zinc-400 shrink-0">
            <Paperclip className="w-4 h-4" />
          </button>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Ask anything about your documents…"
            className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder:text-zinc-500 py-2 max-h-[200px] leading-relaxed"
          />
          <button className="w-9 h-9 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center text-zinc-400 shrink-0">
            <Mic className="w-4 h-4" />
          </button>
          {isGenerating ? (
            <button
              onClick={onStop}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0"
            >
              <Square className="w-4 h-4 text-white fill-white" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!value.trim() || disabled}
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                value.trim() && !disabled
                  ? 'gradient-accent glow-accent hover:opacity-90'
                  : 'bg-white/5 text-zinc-600 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
        <p className="text-center text-[10px] text-zinc-600 mt-2">
          DocMind AI can make mistakes. Verify critical information against source documents.
        </p>
      </div>
    </div>
  );
}
