
import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div>
        <h2>Dashboard</h2>
        <p>Monitor and manage your website testing activities.</p>
      </div>

      <div className="header-actions">
        <button className="icon-button" aria-label="Search">
          <Search size={19} />
        </button>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
        </button>

        <div className="header-avatar">TP</div>
      </div>
    </header>
  );
}

export default Header;
