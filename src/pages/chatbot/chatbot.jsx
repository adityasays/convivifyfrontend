import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, MessageSquare } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/api/chatbot/history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => setMessages(d.messages || []))
      .catch(err => console.error("Error loading history:", err));
  }, [token]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chatbot/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm here for you... just having a tiny hiccup. Keep talking to me" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Sophisticated Background Grid */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* Gradient Orbs */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'pulse 8s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '-20%',
        left: '-10%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'pulse 10s ease-in-out infinite reverse',
        zIndex: 0
      }}></div>

      {/* Header */}
      <div style={{
        position: 'sticky',
        top: '10%',
        zIndex: 10,
        display:'flex',
        
        
        
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '20px 32px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
            }}>
              <MessageSquare size={22} style={{ color: '#fff', strokeWidth: 2.5 }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#fff',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                Convi Buddy
              </h1>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: '400'
              }}>
                AI-Powered Conversation Assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '100px 32px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          backgroundColor: 'rgba(17, 17, 17, 0.6)',
          backdropFilter: 'blur(40px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.04)',
          height: 'calc(100vh - 180px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {messages.length === 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  position: 'relative'
                }}>
                  <MessageSquare size={40} style={{ color: '#8b5cf6', strokeWidth: 2 }} />
                </div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#fff',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em'
                }}>
                  Start a Conversation
                </h2>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  maxWidth: '480px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Welcome to Convi Buddy. Share your thoughts and let's have a meaningful conversation.
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                  alignItems: 'flex-start'
                }}
              >
                {/* Avatar */}
                <div style={{
                  flexShrink: 0,
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: m.role === "user" 
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid ' + (m.role === "user" ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.08)'),
                  boxShadow: m.role === "user" 
                    ? '0 0 20px rgba(99, 102, 241, 0.3)'
                    : 'none'
                }}>
                  {m.role === "user" ? (
                    <User size={18} style={{ color: '#fff', strokeWidth: 2.5 }} />
                  ) : (
                    <Bot size={18} style={{ color: '#8b5cf6', strokeWidth: 2.5 }} />
                  )}
                </div>

                {/* Message Bubble */}
                <div style={{
                  flex: 1,
                  maxWidth: '70%',
                  textAlign: m.role === "user" ? 'right' : 'left'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '12px 18px',
                    borderRadius: '14px',
                    fontSize: '14.5px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    ...(m.role === "user" ? {
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: '#fff',
                      borderBottomRightRadius: '4px',
                      boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    } : {
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      borderBottomLeftRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)'
                    })
                  }}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <Bot size={18} style={{ color: '#8b5cf6', strokeWidth: 2.5 }} />
                </div>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  borderBottomLeftRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: '7px',
                          height: '7px',
                          backgroundColor: '#8b5cf6',
                          borderRadius: '50%',
                          animation: 'bounce 1.4s ease-in-out infinite',
                          animationDelay: `${i * 0.16}s`
                        }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '20px 32px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            backgroundColor: 'rgba(10, 10, 10, 0.4)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '13px 18px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  fontSize: '14.5px',
                  outline: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.2s ease',
                  color: '#fff'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  background: loading || !input.trim() 
                    ? 'rgba(99, 102, 241, 0.3)'
                    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#fff',
                  padding: '13px 24px',
                  borderRadius: '12px',
                  border: '1px solid ' + (loading || !input.trim() ? 'rgba(255, 255, 255, 0.08)' : 'rgba(99, 102, 241, 0.3)'),
                  fontSize: '14.5px',
                  fontWeight: '500',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: loading || !input.trim() 
                    ? 'none'
                    : '0 4px 16px rgba(99, 102, 241, 0.3)',
                  transform: 'scale(1)',
                  opacity: loading || !input.trim() ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading && input.trim()) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = loading || !input.trim() 
                    ? 'none'
                    : '0 4px 16px rgba(99, 102, 241, 0.3)';
                }}
              >
                <Send size={16} style={{ strokeWidth: 2.5 }} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}