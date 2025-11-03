"use client";

import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { TbSquareNumber7Filled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { motion } from "motion/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { cn } from "../lib/util";
import { useState, useEffect } from "react";

/* ✅ API FUNCTIONS OUTSIDE COMPONENT */
async function getTodos() {
  const res = await fetch("/api/todos", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  return Array.isArray(data) ? data : data.data || [];   // ✅ FIX here
}



async function addTodo(task: string) {
  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({ task }),
  });
}

async function updateTodo(id: string, status: boolean, task: string) {
  await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({ task, status }),
  });
}

async function deleteTodo(id: string) {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
}


/* ✅ MAIN COMPONENT */
export const Planner = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

 useEffect(() => {
  async function fetchData() {
    const t = await getTodos();
    console.log("Fetched todos:", t); // ✅ Should log your new tasks
    setTodos(t);
  }
  fetchData();
}, []);


  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await addTodo(newTask);
    setNewTask("");
    setTodos(await getTodos());
  };

  const handleEdit = (todo: any) => {
    setEditId(todo._id);
    setEditText(todo.task);
  };

  const handleSaveEdit = async () => {
    await updateTodo(editId!, false, editText);
    setTodos(await getTodos());
    setEditId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(await getTodos());
  };

  return (
    <div className="flex flex-col h-auto w-full rounded-tl-2xl border dark:border-neutral-700 bg-white dark:bg-neutral-900">

      {/* Header */}
      <div className="flex justify-between items-center p-4 h-16 border dark:border-neutral-700 shadow-sm">
        <h1 className="text-2xl font-bold dark:text-white">
          <FaTasks className="inline mr-2" /> My Tasks
        </h1>
      </div>

      {/* UI */}
      <div className="p-20 items-center gap-8">
        <div className="flex justify-center ">
          <div className="w-100 h-auto border border-solid rounded-sm shadow-lg border-white\60  bg-white\60 dark:bg-neutral-700 text-white p-5">
            <h1 className="text-2xl font-bold text-black dark:text-white">Today</h1>

            <div className="mt-4 grid gap-4">
              {todos.length === 0 && (
                <p className="text-gray-400 text-sm">No tasks yet</p>
              )}

              {todos.map((todo) => (
                <motion.div
                  key={todo._id}
                  layout
                  className=" bg-red-100 dark:bg-white/70 text-black p-4 rounded-lg flex justify-between"
                >
                  <div className="flex  justify-center gap-2 items-center">
                    {editId === todo._id ? (
                      <>
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="border px-2 py-1 rounded-md"
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <input
  type="checkbox"
  checked={todo.status}
  onChange={async () => {
    await updateTodo(todo._id, !todo.status, todo.task);
    setTodos(await getTodos());
  }}
  className="w-5 h-5 cursor-pointer accent-green-500"
/>

<span className={todo.status ? "line-through text-gray-500" : ""}>
  {todo.task}
</span>
<CiEdit
  className="text-orange-500 text-3xl cursor-pointer"
  onClick={() => handleEdit(todo)}
/>
                      </>
                    )}
                    <MdDeleteForever
                      className="text-red-500 text-3xl cursor-pointer"
                      onClick={() => handleDelete(todo._id)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a new task"
              className="mt-5 p-2 bg-gray-100 dark:bg-white rounded-md w-full text-black"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="bg-black text-white p-2 rounded-md mt-2 w-full"
              onClick={handleAdd}
            >
              Add Task
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Planner;
