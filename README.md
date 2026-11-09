# TestPilot AI 🤖

### Autonomous Website Testing Agent

TestPilot AI is an AI-powered website testing agent designed to automate website exploration, identify potential bugs, execute browser-based tests, and generate understandable testing reports.

The goal is to make website testing easier by combining browser automation with AI-assisted test planning and failure analysis.

This project is being developed incrementally as a personal software project.

---

## 🎯 Project Objective

Traditional website testing often requires developers and testers to manually navigate websites, check functionality, identify issues, and document bugs.

TestPilot AI aims to simplify this process by allowing users to provide a website URL and letting an automated testing agent explore the website, interact with its elements, identify potential issues, and generate reports.

---

## ✨ Planned Features

- **Automated Website Exploration:** Visit websites and inspect their pages, links, buttons, and forms.
- **Browser Automation:** Execute browser interactions and test scenarios using Playwright.
- **AI-Powered Test Planning:** Use Gemini AI to help generate relevant test scenarios.
- **Bug Detection:** Identify potential errors and unexpected website behavior.
- **Screenshot Evidence:** Capture screenshots to help document detected issues.
- **AI-Assisted Failure Analysis:** Analyze test failures and provide understandable explanations.
- **Testing Reports:** Generate structured reports containing test results and detected issues.
- **Test History:** Store previous testing sessions and reports.

*These are planned capabilities and will be implemented progressively.*

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| TypeScript | Type-safe frontend development |
| Python | Backend development |
| FastAPI | Backend API |
| Playwright | Browser automation |
| Gemini API | AI-assisted test planning and analysis |
| SQLite | Local database and test history |
| GitHub Copilot | AI coding assistant |

---

## 🤖 AI-Assisted Development

GitHub Copilot is used as an AI coding assistant during the development of TestPilot AI.

It helps with:

- Code suggestions and implementation assistance.

- Understanding programming concepts and technologies.

- Debugging and troubleshooting.

- Improving code readability and structure.

### Note:
GitHub Copilot assists with development. Gemini AI is planned as part of TestPilot AI's own application functionality for test planning and failure analysis.

## 🏗️ Project Architecture

The application is planned around three main components:

1. **Frontend:** Provides the dashboard, website URL input, testing controls, and reports.
2. **Backend:** Handles API requests, testing workflows, and communication between the frontend and testing engine.
3. **AI and Automation Engine:** Uses Playwright for browser interactions and Gemini AI for test planning and failure analysis.

---

## 📁 Project Structure

```text
TestPilot-AI/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Sidebar.tsx
│       │   ├── Header.tsx
│       │   └── StatCard.tsx
│       ├── App.tsx
│       ├── App.css
│       └── index.css
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── tests/
│   ├── requirements.txt
│   └── venv/
│
└── README.md
```

---

## 🚀 Current Development Progress

### Milestone 1 – Project Setup
- [x] Created the project structure.
- [x] Set up the React + TypeScript frontend.
- [x] Set up the Python backend.
- [x] Installed the initial dependencies.
- [x] Configured FastAPI and Playwright.

### Milestone 2 – Backend Foundation
- [x] Created the FastAPI application.
- [x] Configured CORS for frontend communication.
- [x] Created the root API endpoint.
- [x] Created a health-check endpoint.

### Milestone 3 – Frontend Dashboard
- [x] Created the dashboard layout.
- [x] Added sidebar navigation.
- [x] Added the dashboard header.
- [x] Created reusable statistics cards.
- [x] Added the initial empty-state section.
- [x] Created the website URL input section.
- [x] Added frontend URL validation.
- [x] Added the Start Testing button.
- [x] Created the backend website preparation endpoint.
- [x] Connected React frontend with FastAPI using Axios.
- [x] Added loading, success, and error states.
- [x] Configured CORS for GitHub Codespaces.
- [x] Verified frontend-backend communication.

### Upcoming Milestones

- [ ] Add website URL input and testing controls.
- [ ] Connect the frontend with the FastAPI backend.
- [ ] Build the website exploration engine.
- [ ] Implement automated browser testing using Playwright.
- [ ] Integrate Gemini AI for test planning and analysis.
- [ ] Implement bug reports and screenshot evidence.
- [ ] Add SQLite-based test history.
- [ ] Improve the interface and prepare the application for deployment.
---

## 💻 Local Setup

### Prerequisites

- Node.js and npm
- Python 3.10+
- Git
- VS Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/TestPilot-AI.git
cd TestPilot-AI
```

### 2. Set up the frontend

```bash
cd frontend
npm install
npm install axios lucide-react react-router-dom
npm run dev
```

Frontend: `http://localhost:5173`

### 3. Set up the backend

Open another terminal:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m playwright install chromium
```

Start the backend:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend: `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

**Windows users:** Activate the virtual environment using:

```powershell
.\venv\Scripts\Activate.ps1
```

---

## 🔮 Future Improvements

- More advanced automated test generation.
- Support for testing multiple pages and user workflows.
- Better error classification and debugging suggestions.
- Exportable testing reports.
- Improved test execution and monitoring.
- More comprehensive test coverage.

---

## 👩‍💻 Development Approach

TestPilot AI is being developed as a hands-on learning and engineering project.

The development process focuses on building each component step by step, understanding the underlying technologies, and gradually integrating AI capabilities with real browser automation.

---

## 📌 Project Status

**Currently in development.**

The initial backend foundation and frontend dashboard have been started. Browser-based testing, AI integration, and reporting capabilities are planned for upcoming development milestones.

---

## 📄 License

This project is currently under development. A license will be added later.
