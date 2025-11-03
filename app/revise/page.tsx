"use client";

import { useState, useEffect } from "react";

export default function RevisionPage() {
  const [topic, setTopic] = useState("");
  const [revisions, setRevisions] = useState([]);


  // Fetch revisions from DB
const fetchRevisions = async () => {
  const response = await fetch("/api/revision", {
    method: "GET",
    credentials: "include",  
  });

  const data = await response.json();
  setRevisions(data.revisions || []);
};
const handleAddRevision = async () => {
  if (!topic.trim()) return;

  const response = await fetch("/api/revision", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ topic }),  
  });

  const data = await response.json();
  console.log(data);

  setTopic("");
  fetchRevisions();
};


  


  useEffect(() => {
    fetchRevisions();
  }, []);

  // Create revision slots
  

  // Mark completed
  const updateRevision = async (id: string, index: number) => {
    await fetch(`/api/revision/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",   // ✅ ensures cookies are sent to server
  body: JSON.stringify({ dateIndex: index }),
});


    fetchRevisions();
  };

  return (
    <div className="min-h-screen px-8 py-6 bg-gray-50 dark:bg-neutral-900">
      <h1 className="text-3xl font-bold text-center dark:text-white">
        📚 Revision Scheduler
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-10">
        Add a topic and we'll auto-generate spaced revision reminders 
      </p>

      {/* Add Revision */}
      <div className="flex justify-center gap-3 mb-10">
        <input
          type="text"
          placeholder="Enter a topic (e.g. Graphs / DSA / React Hooks)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-1/2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-neutral-800 dark:text-white"
        />
        <button
          onClick={handleAddRevision}
          className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Revisions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {revisions.map((rev: any) => (
          <div
            key={rev._id}
            className="p-5 rounded-xl shadow-md bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
          >
            <h2 className="text-xl font-semibold mb-3 dark:text-white">
              {rev.topic}
            </h2>

            <div className="space-y-3">
              {rev.revisionDates.map((r: any, index: number) => (
                <div
                  key={index}
                  className={`flex justify-between px-4 py-2 rounded-lg border transition cursor-pointer ${
                    r.completed
                      ? "bg-green-100 border-green-300 dark:bg-green-800 text-white"
                      : "bg-gray-100 dark:bg-neutral-700 dark:text-white"
                  }`}
                  onClick={() => updateRevision(rev._id, index)}
                >
                  <span>
                    Revision {index + 1} —{" "}
                    {new Date(r.date).toLocaleDateString("en-IN")}
                  </span>
                  <span>
                    {r.completed ? "✅ Done" : "📅 Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
