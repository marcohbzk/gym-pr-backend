# GYM-PR-BACKEND

_Elevate Your Fitness Journey with Seamless Tracking and Compete with Your Friends/Family/Gym Members and even Globally_

[![Last Commit](https://img.shields.io/github/last-commit/marcohbzk/gym-pr-backend)](https://github.com/marcohbzk/gym-pr-backend)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: GPL v3](https://img.shields.io/github/license/marcohbzk/gym-pr-backend)](./LICENSE)

> Built with the tools and technologies:

![Express](https://img.shields.io/badge/-Express-black?logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-purple?logo=jsonwebtokens)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma)
![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

---

## 🚀 Overview

**gym-pr-backend** is a powerful backend solution designed for fitness applications, enabling developers to efficiently manage user data and personal records.

### Why gym-pr-backend?

This project streamlines fitness app development with a robust backend framework and essential features:

- 🔐 **Secure Authentication**: Implements JWT for user login and route protection.
- 🏋️ **Personal Records**: Create, read, update, and delete PRs.
- 🏆 **Leaderboard**: Ranks users based on lifting achievements.
- 🧪 **Testing Support**: Uses Jest to ensure code reliability.
- ⚙️ **Built with Express**: Scalable and easy-to-maintain architecture.

---

## 🚧 Getting Started

### ✅ Prerequisites

- Node.js >= 18
- PostgreSQL
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/marcohbzk/gym-pr-backend.git
cd gym-pr-backend
npm install
```

- Create .env file
- *Supabase was used*
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/gym
JWT_SECRET=your_super_secret_key
```
- ⚙️ Run in development 
```bash
npm run dev
```
- ⚙️ Run in Production 
```bash
npm start
```
- 🧪 Testing 
```bash
npm test
```

---

### 🔄 Replace placeholders:
- Replace tech stack as needed.
- Edit URLs and `.env` keys to fit your setup.
