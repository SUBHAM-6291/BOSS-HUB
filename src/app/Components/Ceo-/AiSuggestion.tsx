'use client'
import React from 'react'

const AiSuggestion = () => {
  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col p-4 bg-black text-white">
      {/* Chat Header */}
      <div className="bg-black p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Business Growth Assistant</h1>
        <p className="text-sm opacity-70">Your AI-powered advisor</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-black p-4 space-y-4">
        {/* AI Message */}
        <div className="flex justify-start">
          <div className="max-w-[70%] p-3 rounded-lg bg-black border border-white/10 text-white">
            <p>Hey there! What’s your biggest business challenge right now?</p>
            <span className="text-xs opacity-50 block mt-1">10:30 AM</span>
          </div>
        </div>
        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-[70%] p-3 rounded-lg bg-white/20 text-white">
            <p>I’m struggling to attract new clients.</p>
            <p>
            
            </p>
            <span className="text-xs opacity-50 block mt-1">10:32 AM</span>
          </div>
        </div>
        {/* AI Response */}
        <div className="flex justify-start">
          <div className="max-w-[70%] p-3 rounded-lg bg-red-600 border border-white/10 text-white">
            <p>  I haven’t integrated any advanced features yet, but I plan to enhance this tool soon.
            Apologies for the basic setup!</p>
            <span className="text-xs opacity-50 block mt-1">10:33 AM</span>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form className="p-4 bg-black border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 p-2 border border-white/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/50"
          />
          <button
            type="submit"
            className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiSuggestion;