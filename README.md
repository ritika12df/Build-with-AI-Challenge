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

## ✨ Features

### Implemented Features

- **Website URL Input:** Enter a website URL through the React dashboard.
- **URL Validation:** Validate the URL and allow HTTP and HTTPS websites.
- **Frontend-Backend Integration:** Connect the React frontend with the FastAPI backend using Axios.
- **Website Exploration:** Use Playwright to launch Chromium and navigate to a website.
- **Website Information Extraction:** Retrieve the page title, final URL, and HTTP response status.
- **Link Detection:** Extract website links and their destinations.
- **Button Detection:** Identify buttons and their types.
- **Form Detection:** Inspect forms, methods, actions, and input field information.
- **Exploration Results Dashboard:** Display the collected website information in the React interface.
- **Loading and Error States:** Show progress and meaningful error messages during website exploration.

### Planned Features

- **Browser Automation:** Execute browser interactions and test scenarios using Playwright.
- **AI-Powered Test Planning:** Use Gemini AI to help generate relevant test scenarios.
- **Bug Detection:** Identify potential errors and unexpected website behavior.
- **Screenshot Evidence:** Capture screenshots to help document detected issues.
- **AI-Assisted Failure Analysis:** Analyze test failures and provide understandable explanations.
- **Testing Reports:** Generate structured reports containing test results and detected issues.
- **Test History:** Store previous testing sessions and reports using SQLite.

These planned capabilities will be implemented progressively.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| TypeScript | Type-safe frontend development |
| Vite | Frontend development server and build tool |
| Python | Backend development |
| FastAPI | Backend API |
| Playwright | Browser automation and website exploration |
| Chromium | Browser used by Playwright |
| Axios | Frontend-backend API communication |
| Lucide React | Dashboard icons |
| Gemini API | Planned AI-assisted test planning and analysis |
| SQLite | Planned local database and test history |
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
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── WebsiteTester.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.css
│   ├── .env.local
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── explorer.py
│   │   ├── __init__.py
│   │   └── main.py
│   ├── tests/
│   └── requirements.txt
│
├── .gitignore
└── README.md
---

## 🚀 Current Development Progress

### Milestone 1 – Project Setup

- [x] Created the project structure.
- [x] Set up the React + TypeScript frontend using Vite.
- [x] Set up the Python backend.
- [x] Installed the initial dependencies.
- [x] Configured FastAPI and Playwright.

### Milestone 2 – Backend Foundation

- [x] Created the FastAPI application.
- [x] Configured CORS for frontend communication.
- [x] Created the root API endpoint.
- [x] Created a health-check endpoint.
- [x] Created the website URL preparation endpoint.
- [x] Added HTTP and HTTPS URL validation.

### Milestone 3 – Frontend Dashboard

- [x] Created the dashboard layout.
- [x] Added sidebar navigation.
- [x] Added the dashboard header.
- [x] Created reusable statistics cards.
- [x] Added the initial empty-state section.
- [x] Created the website URL input section.
- [x] Added frontend URL validation.
- [x] Added the website exploration button.
- [x] Connected React frontend with FastAPI using Axios.
- [x] Added loading and error states.
- [x] Displayed backend responses in the frontend.
- [x] Configured CORS for GitHub Codespaces.
- [x] Configured the backend URL through a frontend environment file.

### Milestone 4 – Website Exploration Engine

- [x] Created a separate website exploration service.
- [x] Integrated Playwright with the FastAPI backend.
- [x] Configured Chromium for browser automation.
- [x] Implemented website navigation using Playwright.
- [x] Extracted website title and final URL.
- [x] Retrieved HTTP response status.
- [x] Detected and extracted website links.
- [x] Detected website buttons and their types.
- [x] Extracted forms and their input field information.
- [x] Created the website exploration API endpoint.
- [x] Connected the exploration endpoint to the React dashboard.
- [x] Displayed exploration results in the frontend.

## Upcoming Milestones

- [ ] Implement automated browser interactions and test execution.
- [ ] Develop automated test scenarios.
- [ ] Integrate Gemini AI for test planning and failure analysis.
- [ ] Implement bug reports and screenshot evidence.
- [ ] Add SQLite-based test history.
- [ ] Improve the interface and user experience.
- [ ] Prepare the application for deployment.

---

## 💻 Local Setup

### Prerequisites

- Node.js and npm
- Python 3.10+
- Git
- VS Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/ritika12df/Build-with-AI-Challenge.git
cd Build-with-AI-Challenge
```

### 2. Set up the frontend

```bash
cd frontend
npm install
npm install axios lucide-react react-router-dom
```

### 4. Configure the Frontend Environment Variable

Create a file named `.env.local` inside the `frontend/` directory.

Add the following configuration:

```env
VITE_API_BASE_URL=http://localhost:8000
```

This variable tells the frontend where the FastAPI backend server is running.

Choose the appropriate backend URL depending on your environment:

| Environment | Example Value |
|---|---|
| Local Development | `http://localhost:8000` |
| GitHub Codespaces | `https://YOUR-CODESPACE-8000.app.github.dev` |
| Deployed Backend | `https://your-backend-domain.com` |

Replace the example Codespaces or deployment URL with your actual backend server URL.

**Important:**

- Use the backend URL, not the frontend URL.
- Do not add `/api` at the end.
- Avoid a trailing slash.
- Keep `.env.local` private and do not commit it to GitHub.
- Restart the Vite development server after changing environment variables.

### 5. Start the Frontend

```bash
npm run dev
```

**Frontend Development URL:**

`http://localhost:5173`

The frontend uses `VITE_API_BASE_URL` to communicate with the backend, so the correct server URL must be configured before testing.

---
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

This project is currently under MIT License.
