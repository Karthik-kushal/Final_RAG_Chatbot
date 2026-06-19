import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import LoadingDots from './components/LoadingDots';
import { initialMessages, emptyStateSources, type ChatMessage as Msg } from './data/mockData';
import { queryRAG } from './services/api';
import { Sparkles, BookOpen, Shield, Zap } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    if (isEmpty) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    setHasScrolled(true);
  }, [messages, isLoading, isEmpty]);

  const handleSend = async (text: string) => {
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setIsLoading(true);

    try {
      const response = await queryRAG(text);
      const aiMsg: Msg = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.sources.map((s, idx) => ({
          id: `src-${idx}`,
          filename: s.name,
          page: s.page,
          snippet: '',
          score: 1 - response.similarity_distance,
          type: 'PDF' as const,
        })),
      };
      setMessages((m) => [...m, aiMsg]);
    } catch (error) {
      const errorMsg: Msg = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Make sure the backend API is running on port 5000.',
        sources: [],
      };
      setMessages((m) => [...m, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4F8CFF]/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#6FB1FF]/5 blur-[100px]" />
      </div>

      <Sidebar activeQuery={null} onNewChat={handleNewChat} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header />

        <div className="flex-1 overflow-y-auto" ref={scrollRef}>
          <div className="bg-grid radial-glow">
            {isEmpty ? (
              <div className="min-h-[calc(100vh-64px)] flex flex-col">
                <Hero />
                <div className="flex-1 flex items-center">
                  <EmptyState onPick={handleSend} />
                </div>
                <FeatureStrip />
              </div>
            ) : (
              <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-7">
                {!hasScrolled && <Hero compact />}
                {messages.map((msg, i) => (
                  <div key={msg.id} className="group">
                    <ChatMessage message={msg} index={i} />
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <LoadingDots />
                  </div>
                )}
                <div className="h-4" />
              </div>
            )}
          </div>
        </div>

        {!isEmpty && (
          <ChatInput
            onSend={handleSend}
            disabled={isLoading}
            isGenerating={isLoading}
            onStop={() => setIsLoading(false)}
          />
        )}
        {isEmpty && (
          <ChatInput onSend={handleSend} disabled={isLoading} />
        )}
      </div>
    </div>
  );
}

function Hero({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] text-zinc-300 mb-3">
          <Sparkles className="w-3 h-3 text-[#4F8CFF]" />
          Document Intelligence Hub
        </div>
      </div>
    );
  }
  return (
    <div
      className={`text-center px-4 ${
        compact ? 'pt-10 pb-4' : 'pt-16 sm:pt-20 pb-6'
      }`}
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs text-zinc-300 mb-6 animate-fade-in-up">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full bg-[#4F8CFF] ping-slow" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-[#4F8CFF]" />
        </span>
        RAG-powered · {emptyStateSources.length} documents indexed
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text leading-[1.1] max-w-2xl mx-auto animate-fade-in-up stagger-1 text-glow">
        Document Intelligence Hub
      </h1>
      <p className="text-zinc-400 mt-4 text-base sm:text-lg max-w-xl mx-auto animate-fade-in-up stagger-2">
        Ask questions across thousands of pages instantly.
      </p>
    </div>
  );
}

function FeatureStrip() {
  const features = [
    { icon: Zap, title: 'Instant Retrieval', desc: 'Sub-second vector search' },
    { icon: Shield, title: 'Cited Answers', desc: 'Every claim traceable' },
    { icon: BookOpen, title: 'Multi-format', desc: 'PDF, DOCX, Markdown' },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 pb-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {features.map((f, i) => (
        <div
          key={f.title}
          className="glass rounded-2xl p-4 flex items-center gap-3 hover-lift hover:border-white/20 stagger-${i}"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="w-9 h-9 rounded-lg bg-[#4F8CFF]/15 flex items-center justify-center shrink-0">
            <f.icon className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{f.title}</p>
            <p className="text-[11px] text-zinc-500">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
