'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotWidgetProps {
  locale: string;
}

const WELCOME: Record<string, string> = {
  fr: 'Bonjour ! Je suis Dahlia 🍯\nComment puis-je vous aider à trouver votre miel idéal ?',
  ar: 'مرحباً! أنا داليا 🍯\nكيف يمكنني مساعدتك في العثور على عسلك المثالي؟',
};

const PLACEHOLDER: Record<string, string> = {
  fr: 'Posez votre question...',
  ar: 'اكتب سؤالك...',
};

const SEND_LABEL: Record<string, string> = {
  fr: 'Envoyer',
  ar: 'إرسال',
};

export function ChatbotWidget({ locale }: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME[locale] ?? WELCOME.fr },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isRtl = locale === 'ar';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: text },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages([...newMessages, assistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          locale,
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: 'assistant', content: full }]);
      }

      if (!open) setUnread(true);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: isRtl
            ? 'حدث خطأ، حاول مجدداً.'
            : 'Une erreur est survenue, réessayez.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 ${isRtl ? 'start-4' : 'end-4'} z-50 w-[calc(100vw-2rem)] max-w-sm transition-all duration-300 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-[#fed330]/20 bg-[#1a1310]"
          style={{ height: '460px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#fed330] to-[#eb8316]">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#1a1310]/20 flex items-center justify-center">
                <Bot className="size-4 text-[#1a1310]" />
              </div>
              <div>
                <p className="text-[#1a1310] font-bold text-sm leading-tight">
                  Dahlia
                </p>
                <p className="text-[#1a1310]/70 text-[10px] leading-tight">
                  {isRtl ? 'مساعدة ذكية • متصل' : 'Assistante IA • En ligne'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="size-7 flex items-center justify-center rounded-full bg-[#1a1310]/10 hover:bg-[#1a1310]/20 transition-colors"
            >
              <ChevronDown className="size-4 text-[#1a1310]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? (isRtl ? 'justify-start' : 'justify-end') : isRtl ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#fed330] text-[#1a1310] font-medium rounded-br-sm'
                      : 'bg-white/10 text-white/90 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                  {msg.role === 'assistant' &&
                    loading &&
                    i === messages.length - 1 &&
                    msg.content === '' && (
                      <span className="inline-flex gap-1 items-center">
                        <span className="size-1.5 bg-[#fed330] rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="size-1.5 bg-[#fed330] rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="size-1.5 bg-[#fed330] rounded-full animate-bounce [animation-delay:300ms]" />
                      </span>
                    )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-[#1a1310]">
            <div className="flex items-end gap-2 bg-white/8 border border-white/10 rounded-xl px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={PLACEHOLDER[locale] ?? PLACEHOLDER.fr}
                rows={1}
                dir={isRtl ? 'rtl' : 'ltr'}
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm resize-none outline-none leading-relaxed max-h-24"
                style={{ minHeight: '24px' }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                aria-label={SEND_LABEL[locale]}
                className="size-8 shrink-0 flex items-center justify-center rounded-lg bg-[#fed330] text-[#1a1310] hover:bg-[#dbb12f] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <Send className="size-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-white/20 text-center mt-2">
              {isRtl
                ? 'مدعوم بالذكاء الاصطناعي · Golden Dahlia'
                : 'IA · Golden Dahlia'}
            </p>
          </div>
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={isRtl ? 'فتح الدردشة' : 'Ouvrir le chat'}
        className={`fixed bottom-5 ${isRtl ? 'start-4' : 'end-4'} z-50 size-14 rounded-full bg-gradient-to-br from-[#fed330] to-[#eb8316] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center`}
      >
        {open ? (
          <X className="size-6 text-[#1a1310]" />
        ) : (
          <span className="text-2xl select-none">🍯</span>
        )}
        {unread && !open && (
          <span className="absolute top-0.5 end-0.5 size-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </>
  );
}
