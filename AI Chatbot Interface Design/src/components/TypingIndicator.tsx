export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="flex flex-col gap-1" style={{ maxWidth: '80%' }}>
        <div className="px-4 py-3 rounded-2xl border border-white/20 bg-white/10" style={{ backdropFilter: 'blur(8px)' }}>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        <span className="text-xs text-muted-foreground px-2">Typing...</span>
      </div>
    </div>
  );
}