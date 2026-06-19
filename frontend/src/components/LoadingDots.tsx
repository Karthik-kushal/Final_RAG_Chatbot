export default function LoadingDots() {
  return (
    <div className="flex gap-2.5 animate-fade-in-up">
      <div className="w-9 h-9 rounded-xl gradient-accent glow-accent flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
          <path d="M9 3a3 3 0 0 0-3 3v.5A2.5 2.5 0 0 0 4 9c0 1 .5 1.8 1.2 2.3A2.5 2.5 0 0 0 6 16a2.5 2.5 0 0 0 3 2.4V3Z" fill="currentColor" opacity="0.9" />
          <path d="M15 3a3 3 0 0 1 3 3v.5A2.5 2.5 0 0 1 20 9c0 1-.5 1.8-1.2 2.3A2.5 2.5 0 0 1 18 16a2.5 2.5 0 0 1-3 2.4V3Z" fill="currentColor" />
        </svg>
      </div>
      <div className="glass rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-[#4F8CFF] bounce-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
    </div>
  );
}
