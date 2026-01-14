
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, BRAND_NAME } from '../constants';
import { Product } from '../types';

interface AISuggestionToolProps {
  onViewProduct: (productName: string) => void;
  wishlistItems: Product[];
}

const AISuggestionTool: React.FC<AISuggestionToolProps> = ({ onViewProduct, wishlistItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Hi there! I'm your ${BRAND_NAME} Personal Stylist. I've synced with your preferences. How can I help you style your day?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Catalog context
      const productContext = PRODUCTS.map(p => `- ${p.name} (${p.price}): ${p.description}`).join('\n');
      
      // Personalization context
      const wishlistContext = wishlistItems.length > 0 
        ? `The user currently has these favorites saved: ${wishlistItems.map(p => p.name).join(', ')}.`
        : "The user hasn't saved any favorites yet.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a world-class personal fashion stylist for the luxury brand ${BRAND_NAME}. 
          Your style is sophisticated, encouraging, and highly personalized.
          
          CONTEXT:
          - Full Catalog:
          ${productContext}
          
          - User Personalization:
          ${wishlistContext}
          
          GOAL:
          Provide styling advice. If the user has items in their wishlist, use that information to make better recommendations (e.g., "Since you liked the [Product], you might also love the [Another Product]").
          
          RULES:
          1. Keep responses under 3 sentences.
          2. Always mention exact product names from the catalog.
          3. Be helpful and concierge-like.`,
        },
      });

      const aiText = response.text || "I'm having a brief moment of reflection. How else can I assist your style journey?";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm offline for a quick wardrobe change! Feel free to browse our New Arrivals in the meantime." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageText = (text: string): React.ReactNode[] => {
    let parts: React.ReactNode[] = [text];
    
    PRODUCTS.forEach(product => {
      const newParts: React.ReactNode[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${product.name})`, 'gi');
          const split = part.split(regex);
          split.forEach((subPart, i) => {
            if (subPart.toLowerCase() === product.name.toLowerCase()) {
              newParts.push(
                <button 
                  key={`${product.id}-${i}`}
                  onClick={() => onViewProduct(product.name)}
                  className="text-rose-600 font-bold underline hover:text-rose-800 transition-colors inline text-left"
                >
                  {subPart}
                </button>
              );
            } else if (subPart !== "") {
              newParts.push(subPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen && (
        <div 
          className="bg-white w-[350px] sm:w-[400px] h-[550px] shadow-2xl rounded-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          role="dialog"
          aria-label="Personal Stylist Chat"
        >
          <div className="bg-rose-500 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <i className="fas fa-sparkles text-sm"></i>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-rose-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase">Concierge AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                  <p className="text-[10px] text-white/80 font-medium">Personalized for you</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:rotate-90 transition-transform p-2"
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-5 space-y-4 bg-[#FAF9F6]"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gray-900 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your favorites or new arrivals..."
                className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-gray-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all disabled:bg-gray-200 shadow-md"
              >
                <i className="fas fa-arrow-up text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-rose-500 text-white w-16 h-16 rounded-full shadow-2xl flex flex-col items-center justify-center gap-1 hover:scale-110 active:scale-95 transition-all group relative"
          aria-label="Open AI Stylist"
        >
          <div className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white items-center justify-center text-[10px] font-bold">1</span>
          </div>
          <i className="fas fa-sparkles text-xl group-hover:rotate-12 transition-transform"></i>
          <span className="text-[8px] font-bold tracking-tighter uppercase">Stylist</span>
        </button>
      )}
    </div>
  );
};

export default AISuggestionTool;
