# 🚀 GoalPilot – Smart Student Copilot AI

GoalPilot is a **personal productivity and learning assistant for students**.  
It acts as a **Smart Student Copilot**, helping you stay consistent, plan your studies, track progress, and revise efficiently.

> ✨ **USP — Plangen AI + Revision Scheduler**  
> GoalPilot's unique strength lies in its ability to generate personalized study plans using AI  
> and automatically schedule revisions (1/3/7 day cycle), ensuring long-term retention.

---

## 🌟 Features

| Feature | Description |
|---------|-------------|
| 🧠 **Plangen AI – Study Plan Generator** | AI-powered study plan generation using **Gemini API**. Enter your goal, availability, and deadline → get a customized plan. |
| ✅ **Task Planner & Todos Dashboard** | Add, edit, delete todos — track your daily progress. |
| 🔁 **Revision Scheduler (USP)** | Automatically generates revision schedule (1/3/7 day rule) so students never forget to revise. |
| 📅 **Personal Productivity Dashboard** | View tasks, plans, and revision progress in one place. |
| 🔐 **Authentication** | JWT-based secure authentication handled using **httpOnly cookies**. |
| 🛢️ **Persistent Storage** | Users' todos, study plans, and revision entries are stored securely. |

---

## 🧩 Tech Stack

### **Frontend**
- ⚡ Next.js (App Router)
- 🎨 Tailwind CSS
- 🧩 ShadCN UI components

### **Backend / APIs**
- Next.js API Routes (Server Actions)
- Google **Gemini API** (for Plangen AI)
- Authentication using **JWT + httpOnly Cookies**

### **Database**
- Relational DB (MongoDB)

---

## 🛠️ System Architecture
+------------------+ +---------------------+
| Next.js UI | -----> | Next.js API Routes |
+------------------+ +---------------------+
| |
v v
User Actions Todos / Plans / Revisions
| |
v v
+------------------+ +-------------------+
| Cookies + JWT | | Relational DB |
| (Authentication) | | (Neon/Supabase) |
+------------------+ +-------------------+
             +----------------+
             | Gemini API     |
             | (Plangen AI)   |
             +----------------+

---

## 🧪 Challenges Faced & Solutions

| Challenge | What happened | Solution |
|----------|---------------|----------|
| Designing schemas for Todos, Plans, Revision Scheduler | Multiple entities needed relational mapping | Designed normalized schemas and relationships |
| API issues & auth failures | Tokens weren’t persistent | Switched to **JWT stored in secure cookies** |
| Testing APIs | Requests were failing unexpectedly | Used **Postman** to test and debug API routes |
| Revision scheduler logic | Unsure how to generate revision cycles | Implemented JS function → auto creates entries (1/3/7 days) |
| Integrating AI (Gemini) | Output parsing and DB sync issues | Added structured prompt + validation logic |

---

## 🧠 How Plangen AI Works

1. User enters goal (e.g., "Complete DSA in 30 days")
2. Gemini AI analyzes:
   - Time available
   - Workload
   - Difficulty breakdown
3. AI generates structured plan + stores it in DB

Example AI Output:

Day 1–3: Arrays
Day 4–6: Strings
Day 7–10: Linked List
...

---

## 🔁 Revision Scheduler (USP)

Automatically creates revision tasks based on forgetting curve:

| Revision | Scheduled After |
|----------|----------------|
| 1st Revision | +1 day |
| 2nd Revision | +3 days |
| 3rd Revision | +7 days |

This ensures **maximum retention** with minimal effort.

---

## 📦 Installation & Setup

Clone the project:

```bash
git clone https://github.com/YOUR_USERNAME/GoalPilot.git
cd GoalPilot
npm install
Mongo_URI=your-db-url
GEMINI_API_KEY=your-gemini-key
JWT_SECRET=your-secret


