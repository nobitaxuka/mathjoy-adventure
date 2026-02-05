# MathJoy Adventure - System Overview

## 🎯 Project Goal
A gamified math learning platform for kids (4-8 years old) with progressive levels, "3-lives" mechanic, and randomized questions.

## 🏗️ Architecture Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (Vanilla CSS for custom animations)
- **State Management:** React Context / Hooks
- **Logic:** 
  - Level Manager
  - Question Generator
  - Progress Tracker

## 📁 Folder Structure
- `/src/app`: Routes and Page components
- `/src/components`: Reusable UI elements (Button, Card, Mascot, etc.)
- `/src/lib`: Core game engine logic
- `/src/services`: Data fetching/API (if any)
- `/src/types`: TypeScript definitions
- `/src/utils`: Helper functions
- `/.brain`: AI context and project knowledge

## 🛡️ Stability Strategy
- **Git workflow:** Feature-based branches
- **Testing:** Unit tests for game logic
- **Context Retention:** `/save-brain` at end of sessions
