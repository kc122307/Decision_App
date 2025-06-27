
---

## 🧑‍💻 Local Development

### Prerequisites

- Node.js (v18+ recommended)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <project-root>
```

### 2. Setup Backend

```bash
cd server
npm install
# Create a .env file in server/ with:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-secret>
npm start
```

### 3. Setup Frontend

```bash
cd ..
npm install
# Create a .env file in the project root with:
# VITE_API_URL=https://decision-app-1ds2.onrender.com
npm run dev
```

---

## 🏗️ Deployment

- **Frontend:** Deployed on Vercel ([Vercel Docs](https://vercel.com/docs))
- **Backend:** Deployed on Render ([Render Docs](https://render.com/docs))

---

## 🙋 FAQ

- **Is this production-ready?**  
  No, this is a demo and not intended for real-world use.

- **Is my data private?**  
  Yes. No analytics or tracking. API keys are stored only in your browser.

- **Can I use my own OpenAI API key?**  
  Yes, in "Real Mode" via the Settings panel.

---

## 📄 License

This project is for demonstration and educational purposes only.

---

## ✨ Credits

Created by Kunal Chandel.  
Inspired by decision science, philosophy, and modern AI.
