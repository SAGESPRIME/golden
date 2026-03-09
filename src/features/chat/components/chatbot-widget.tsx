'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Send, ChevronDown } from 'lucide-react';

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
  const [wobble, setWobble] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isRtl = locale === 'ar';

  /* Scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  /* Periodic wobble animation to attract attention */
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      setWobble(true);
      setTimeout(() => setWobble(false), 800);
    }, 4000);
    return () => clearInterval(id);
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
        className={`fixed bottom-28 ${isRtl ? 'start-4' : 'end-4'} z-50 w-[calc(100vw-2rem)] max-w-sm transition-all duration-300 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-[#fed330]/30 bg-[#1a1310]"
          style={{ height: '480px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#fed330] to-[#eb8316]">
            <div className="flex items-center gap-2.5">
              <div className="size-10 rounded-full overflow-hidden ring-2 ring-[#1a1310]/20 shrink-0">
                <Image
                  src="/images/chatbot-bee.png"
                  alt="Dahlia"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[#1a1310] font-bold text-sm leading-tight">
                  Dahlia
                </p>
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-green-600 animate-pulse" />
                  <p className="text-[#1a1310]/70 text-[10px] leading-tight">
                    {isRtl ? 'مساعدة ذكية • متصل' : 'Assistante IA • En ligne'}
                  </p>
                </div>
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
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.role === 'user'
                    ? isRtl
                      ? 'justify-start'
                      : 'justify-end'
                    : isRtl
                      ? 'justify-end flex-row-reverse'
                      : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="size-6 rounded-full overflow-hidden shrink-0 mb-0.5">
                    <Image
                      src="/images/chatbot-bee.png"
                      alt="Dahlia"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
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
                      <span className="inline-flex gap-1 items-center h-4">
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

      {/* Tooltip bulle au-dessus du bouton */}
      {!open && (
        <div
          className={`fixed bottom-[7.5rem] ${isRtl ? 'start-4' : 'end-4'} z-50 pointer-events-none`}
        >
          <div className="bg-white text-[#1a1310] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-[#fed330]/40 whitespace-nowrap animate-bounce-slow">
            {isRtl ? 'تحتاج مساعدة؟ 🍯' : "Besoin d'aide ? 🍯"}
            <div
              className={`absolute top-full ${isRtl ? 'start-4' : 'end-4'} -mt-px w-0 h-0`}
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid white',
              }}
            />
          </div>
        </div>
      )}

      {/* FAB Button */}
      <div
        className={`fixed bottom-5 ${isRtl ? 'start-4' : 'end-4'} z-50 ${wobble && !open ? 'animate-wobble' : ''} ${open ? 'scale-95' : 'hover:scale-110'} transition-all duration-200`}
        style={{ width: 72, height: 72 }}
      >
        {/* Pulse rings */}
        {!open && (
          <>
            <span
              className="absolute inset-0 rounded-full bg-[#fed330]/25 animate-ping pointer-events-none"
              style={{ animationDuration: '2s' }}
            />
            <span
              className="absolute inset-[-4px] rounded-full bg-[#fed330]/12 animate-ping pointer-events-none"
              style={{ animationDuration: '2.5s', animationDelay: '0.6s' }}
            />
          </>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={isRtl ? 'فتح الدردشة' : 'Ouvrir le chat'}
          className="relative w-full h-full rounded-full p-0 border-0 outline-none cursor-pointer active:scale-95 transition-transform overflow-hidden"
          style={{
            filter: open
              ? 'none'
              : 'drop-shadow(0 0 10px rgba(254,211,48,0.9))',
          }}
        >
          {open ? (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#fed330] to-[#eb8316] flex items-center justify-center">
              <X className="size-6 text-[#1a1310]" />
            </div>
          ) : (
            <Image
              src="/images/chatbot-bee.png"
              alt="Dahlia - Support client"
              fill
              className="object-cover scale-[1.18]"
              sizes="72px"
            />
          )}
        </button>

        {/* Badge non lu */}
        {unread && !open && (
          <span className="absolute top-0 end-0 size-4 bg-red-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center text-[8px] text-white font-bold z-10">
            !
          </span>
        )}
      </div>

      <style jsx>{`
        @keyframes wobble {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          15% {
            transform: rotate(-8deg) scale(1.05);
          }
          30% {
            transform: rotate(8deg) scale(1.05);
          }
          45% {
            transform: rotate(-5deg) scale(1.02);
          }
          60% {
            transform: rotate(5deg) scale(1.02);
          }
          75% {
            transform: rotate(-2deg) scale(1);
          }
        }
        .animate-wobble {
          animation: wobble 0.8s ease-in-out;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
