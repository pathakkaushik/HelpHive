// This component has no backend integration and remains the same.
// Included for completeness.
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

// A simple function to generate bot responses
const getBotResponse = (userInput) => {
  const text = userInput.toLowerCase();
  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! How can I assist you with finding domestic help today?";
  }
  if (text.includes("pricing") || text.includes("fee")) {
    return "Our service fee is typically one month's salary of the hired help. This includes verification and a replacement guarantee. For specifics, please sign up!";
  }
  if (text.includes("help") || text.includes("support")) {
    return "You can find helpers by clicking 'Find Help' in the menu. Use the filters to search by location, service, and verification status.";
  }
  if (text.includes("verification") || text.includes("verified")) {
    return "We conduct thorough ID and police verification for professionals to ensure your safety and peace of mind. Look for the verification badges on their profiles.";
  }
  if (text.includes("thank")) {
    return "You're very welcome! Is there anything else I can help with?";
  }
  return "I'm not sure how to answer that. You can try asking about 'pricing', 'verification', or 'how to find help'.";
};


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! I am the HelpHive Assistant. How can I help you?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
        const botMessage = { id: Date.now() + 1, text: getBotResponse(inputValue), sender: 'bot'};
        setMessages(prev => [...prev, botMessage]);
    }, 1000);
    
    setInputValue('');
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleOpen}
          className="btn btn-primary h-16 w-16 rounded-full !p-0 shadow-2xl flex items-center justify-center"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div key="close" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} >
                <X size={32} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <MessageSquare size={32} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-28 right-8 z-50 w-full max-w-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] shadow-2xl flex flex-col h-[70vh] max-h-[500px]"
          >
            {/* Chat Header */}
            <header className="flex items-center justify-between p-4 border-b border-[var(--color-border-subtle)]">
              <h3 className="text-lg font-bold text-[var(--color-text-strong)]">HelpHive Assistant</h3>
              <button onClick={toggleOpen} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"><X size={20} /></button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                   {msg.sender === 'bot' && <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-lg">🐝</div>}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[var(--color-primary)] text-white rounded-br-none'
                        : 'bg-[var(--color-bg-component-subtle)] text-[var(--color-text)] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <footer className="p-4 border-t border-[var(--color-border-subtle)]">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 !py-2"
                />
                <button type="submit" className="btn btn-primary !rounded-lg !px-4 !py-2">
                    <Send size={20}/>
                </button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;