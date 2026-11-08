
import {
  LayoutDashboard,
  Globe,
  Bug,
  History,
  Settings,
  ShieldCheck
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <ShieldCheck size={25} />
        </div>
        <div>
          <h2>TestPilot</h2>
          <span>AI Testing Agent</span>
        </div>
      </div>

      <div className="nav-section">
        <p className="nav-label">WORKSPACE</p>

        <a className="nav-item active" href="#">
          <LayoutDashboard size={19} />
          Dashboard
        </a>

        <a className="nav-item" href="#">
          <Globe size={19} />
          Website Testing
        </a>

        <a className="nav-item" href="#">
          <Bug size={19} />
          Bug Reports
        </a>

        <a className="nav-item" href="#">
          <History size={19} />
          Test History
        </a>
      </div>

      <div className="sidebar-bottom">
        <a className="nav-item" href="#">
          <Settings size={19} />
          Settings
        </a>

        <div className="sidebar-footer">
          <div className="profile-avatar">TP</div>
          <div>
            <strong>TestPilot User</strong>
            <span>Developer Workspace</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
