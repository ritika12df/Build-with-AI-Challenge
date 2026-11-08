
import {
  Globe,
  Bug,
  CheckCircle,
  Activity
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";

import "./App.css";

function App() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header />

        <section className="dashboard-content">

          <div className="welcome-section">
            <div>
              <h1>Welcome to TestPilot AI 👋</h1>
              <p>
                Your intelligent assistant for automated
                website testing and bug detection.
              </p>
            </div>
          </div>

          <div className="stats-grid">

            <StatCard
              title="Websites Tested"
              value="0"
              description="Total websites tested"
              icon={Globe}
            />

            <StatCard
              title="Bugs Detected"
              value="0"
              description="Issues identified"
              icon={Bug}
            />

            <StatCard
              title="Tests Passed"
              value="0"
              description="Successful test cases"
              icon={CheckCircle}
            />

            <StatCard
              title="Test Runs"
              value="0"
              description="Total testing sessions"
              icon={Activity}
            />

          </div>

          <div className="empty-state">
            <Globe size={35} />

            <h3>Your testing workspace is ready</h3>

            <p>
              Your website testing activity will
              appear here once you start your first test.
            </p>
          </div>

        </section>
      </main>

    </div>
  );
}

export default App;
