/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Share2, RefreshCw, Copy, Check } from 'lucide-react';

const MESSAGES = [
  "You are the sunshine in my day and the moonlight in my night.",
  "My heart beats faster every time I think of you.",
  "I can’t imagine my life without your smile.",
  "You are my favorite everything.",
  "Every moment with you feels like a dream.",
  "Your love makes everything better.",
  "I fall in love with you more every single day.",
  "You are the piece of me I didn’t know was missing.",
  "Being with you is like a beautiful melody I never want to end.",
  "You make my heart skip a beat every time I see you.",
  "In your arms, I have found my home.",
  "Every love story is beautiful, but ours is my favorite.",
  "You're the first thing I think of when I wake up and the last thing I think of before I go to sleep.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "If I had a flower for every time I thought of you... I could walk through my garden forever."
];

export default function App() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  const generateMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    // Ensure we don't get the same message twice in a row if possible
    if (MESSAGES[randomIndex] === currentMessage && MESSAGES.length > 1) {
      generateMessage();
      return;
    }
    setCurrentMessage(MESSAGES[randomIndex]);
    setIsCopied(false);
  }, [currentMessage]);

  const copyToClipboard = async () => {
    if (!currentMessage) return;
    try {
      await navigator.clipboard.writeText(currentMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareToWhatsApp = () => {
    if (!currentMessage) return;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(currentMessage)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a0502] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl shadow-black/50">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="inline-block"
              >
                <Heart className="w-12 h-12 text-rose-500 fill-rose-500/20" />
              </motion.div>
              <h1 className="text-3xl font-serif italic text-white tracking-tight">
                Love Notes
              </h1>
              <p className="text-white/40 text-sm uppercase tracking-widest font-medium">
                Generator
              </p>
            </div>

            {/* Message Display Area */}
            <div className="w-full min-h-[160px] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {currentMessage ? (
                  <motion.p
                    key={currentMessage}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="text-xl md:text-2xl font-serif text-white leading-relaxed italic"
                  >
                    "{currentMessage}"
                  </motion.p>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/30 italic font-serif text-lg"
                  >
                    Tap below to reveal a message...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-4 w-full pt-4">
              <button
                id="generate-btn"
                onClick={generateMessage}
                className="group relative flex items-center justify-center gap-3 bg-white text-black py-4 px-8 rounded-2xl font-semibold transition-all hover:bg-rose-50 active:scale-95 overflow-hidden"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>{currentMessage ? "Another Note" : "Generate Note"}</span>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  id="copy-btn"
                  disabled={!currentMessage}
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 px-4 rounded-2xl transition-all active:scale-95"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm font-medium">{isCopied ? "Copied" : "Copy"}</span>
                </button>

                <button
                  id="share-btn"
                  disabled={!currentMessage}
                  onClick={shareToWhatsApp}
                  className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed text-emerald-400 py-3 px-4 rounded-2xl transition-all active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center mt-8 text-white/20 text-xs uppercase tracking-[0.2em] font-medium">
          Crafted with love &bull; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}
