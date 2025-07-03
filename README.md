# 💻 DevMatch — A Tinder-Style App for Developers

**DevMatch** is a developer-focused social platform inspired by Tinder. It allows developers to swipe, connect, and collaborate with like-minded peers. Built with a modern tech stack, DevMatch combines a clean UI with powerful backend features, including email notifications, real-time chat, a chat history, last seen status of friends, and smart data validation. You can see the pics

![friendsDevMatch](https://github.com/user-attachments/assets/415a6856-9fe1-408f-b52a-74df81d4539f)
![requestDevMatch](https://github.com/user-attachments/assets/b5c0ee24-bbc2-41a6-b59e-67098853bed2)
![chatDevMatch](https://github.com/user-attachments/assets/63120607-9fb7-4ae9-a031-0ac39f40fda2)
![homePageDevMatch](https://github.com/user-attachments/assets/0b6571b3-ebaa-4996-9c9a-f2bee8cf7d79)
![profileDevMatch](https://github.com/user-attachments/assets/58c08f13-1988-4121-854d-e0563ebd712e)
![loginDevMatch](https://github.com/user-attachments/assets/00a41a30-7b28-4d3a-ac37-4ee80966365b)
![signupDevMatch](https://github.com/user-attachments/assets/2c9ed93b-edfe-44fc-9638-cd4b505aee9e)


---

## 🚀 Features

- 🔄 **Tinder-style swipe interface** for developer connections  
- 📧 **Automated email notifications via AWS SES**  
  - When a user sends a connection request, the receiver gets an email instantly  
- ⏰ **Daily cron job**  
  - At 10:00 AM daily, receivers are reminded via email about pending connection requests  
- 💬 **Real-time chat** using Socket.IO  
- 💬 **Chat History** user can see older chats with friends.  
- ✅ **Schema validation with Zod** for safe and predictable data handling  
- 🔐 **JWT-based authentication**  
- 🎨 Clean and responsive UI with Tailwind CSS & DaisyUI

---

## 🛠 Tech Stack

### ⚙️ Backend
- **Node.js** & **Express** — RESTful API server
- **MongoDB** — NoSQL database for scalable data storage
- **Zod** — For robust runtime request/response validation
- **Socket.IO** — Real-time messaging for user chat
- **AWS SES (Simple Email Service)** — Transactional and scheduled email delivery
- **cron** — Scheduled jobs to notify users about pending requests

### 🎯 Frontend
- **React** — Component-based frontend UI
- **Redux Toolkit (RTK)** — State management
- **Tailwind CSS** — Utility-first CSS framework
- **DaisyUI** — Tailwind plugin for beautiful, pre-styled UI components

---

## 📬 Email Notification System (Powered by AWS SES)

- When a user sends a connection request, the recipient immediately receives an email.
- A **daily cron job** runs at **10:00 AM**, emailing users who have **pending connection requests**.

![Email Screenshot](https://github.com/user-attachments/assets/df54017e-fa85-42b7-927d-1945c07ab20d)

---


## 🚧 Deployment

Both backend and frontend are deployed on **AWS**:

- **Backend**
  - Hosted on EC2
  - Managed using PM2
  - Node.js + Express + MongoDB Atlas
- **Frontend**
  - Built with React
  - Deployed on EC2 using **Nginx** as a reverse proxy for static assets

---



