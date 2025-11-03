"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
async function sendMessage() {
  if (!input.trim()) return;

  const newUserMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, newUserMessage]);

  const userInput = input;
  setInput("");

  // Show typing bubble before response
  setMessages((prev) => [...prev, { role: "assistant", content: "typing..." }]);

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ message: userInput }),
    });

    const data = await res.json();

    // Remove the "typing..." message and replace it with AI reply
    setMessages((prev) => [
      ...prev.slice(0, prev.length - 1),
      { role: "assistant", content: data.reply },
    ]);
  } catch (err) {
    console.error(err);
  }
}


  return (
    <div className="flex flex-col h-screen flex-1 bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="flex justify-between items-center p-4 h-16 w-full shadow-sm border border-neutral-200 dark:border-neutral-700">
        <h1 className="text-2xl font-bold dark:text-white">PlanGen AI</h1>
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-1 p-6 overflow-y-auto space-y-4 w-[70%] mx-auto">
        {messages.map((msg, index) => (
          <div key={index}>
            <p
              className={`p-3 rounded-lg max-w-xl break-words ${
                msg.role === "assistant"
                  ? "bg-gray-200 text-black"
                  : "bg-blue-600 text-white ml-auto"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 pl-60 pr-40 flex items-center gap-2 border-t border-neutral-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your goal..."
          className="flex-1 p-3 rounded-md bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

