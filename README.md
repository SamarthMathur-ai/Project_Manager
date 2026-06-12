# Project_Manager
To build a full stack project manager website so that a user can manage his/her projects without any effort.


## 🛠️ Getting Started 

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites
Make sure you have Git installed on your computer. You can download it from [git-scm.com](https://git-scm.com/downloads).

### Daily Git Workflow

Here are the exact terminal commands you will use to download the code, save your changes, and upload them back to the repository:

```bash
# 1. Download the project (First time only)
git clone https://github.com/SamarthMathur-ai/Project_Manager.git

# 2. Move into the project folder
cd Project_Manager

# 3. Get the latest code before starting work (Always do this first!)
git pull origin main

# --- MAKE YOUR CODE CHANGES IN YOUR EDITOR ---

# 4. Stage all your changed files
git add .

# 5. Save a snapshot of your work
git commit -m "Add a brief description of what you changed"

# 6. Get any new updates and apply your local changes on top
git pull origin main --rebase

# 7. Upload your changes to GitHub
git push origin main
```

## 📁 Project Structure

This project uses a unified structure. We keep our frontend and backend code in separate folders for organization, but they share a **single, common `package.json`** at the root of the project to make installing dependencies incredibly easy.

```text
Project_Manager/
├── .gitignore                  # Keeps secret keys and big folders out of GitHub
├── README.md                   # The guide you are reading right now!
├── package.json                # 📦 The SINGLE shared list of all dependencies
├── vite.config.js              # Frontend build configurations
├── .env                        # Secret keys and database passwords (NEVER uploaded)
│
├── client/                     # ⚛️ FRONTEND (React)
│   ├── index.html              # Main HTML file
│   ├── src/
│   │   ├── assets/             # Images and global styling (CSS)
│   │   ├── components/         # Reusable UI parts (Buttons, TaskCards, Navbar)
│   │   ├── pages/              # Full-screen views (Dashboard, Login, Settings)
│   │   ├── services/           # Logic for sending requests to the backend
│   │   ├── App.jsx             # Main router that controls which page shows up
│   │   └── main.jsx            # Connects React to the browser
│
└── server/                     # ⚙️ BACKEND (Node.js / Express)
    ├── config/                 # Database connection setup
    ├── models/                 # Database blueprints (User, Task)
    ├── controllers/            # Core logic (creating tasks, deleting projects)
    ├── routes/                 # API URLs (e.g., /api/tasks)
    ├── middleware/             # Security checks (verifying logged-in users)
    └── server.js               # The main file that boots up the backend
```

### Daily Log (Please do date and bulleted list)

**12-06-2026**
