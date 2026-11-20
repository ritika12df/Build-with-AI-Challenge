
import {
  Bug,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface BugItem {
  title: string;
  description: string;
  severity: string;
  status: string;
}

interface BugReportsProps {
  websiteUrl: string;
  generatedAt: string;
  totalBugs: number;
  bugs: BugItem[];
}

function BugReports({
  websiteUrl,
  generatedAt,
  totalBugs,
  bugs
}: BugReportsProps) {
  return (
    <section className="bug-reports">
      <div className="bug-reports-heading">
        <div>
          <h2>Bug Reports</h2>
          <p>Issues detected during automated testing</p>
        </div>
        <Bug size={24} />
      </div>

      <div className="bug-report-summary">
        <strong>{totalBugs}</strong>
        <span>Detected Issues</span>
      </div>

      <div className="bug-report-meta">
        <p><strong>Website:</strong> {websiteUrl}</p>
        <p>
          <strong>Generated:</strong>{" "}
          {new Date(generatedAt).toLocaleString()}
        </p>
      </div>

      {bugs.length === 0 ? (
        <div className="no-bugs">
          <CheckCircle size={22} />
          <p>No failed checks were detected.</p>
        </div>
      ) : (
        <div className="bug-list">
          {bugs.map((bug, index) => (
            <div className="bug-item" key={`${bug.title}-${index}`}>
              <AlertCircle size={20} />

              <div className="bug-item-content">
                <h3>{bug.title}</h3>
                <p>{bug.description}</p>

                <div className="bug-item-labels">
                  <span>{bug.severity} severity</span>
                  <span>{bug.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default BugReports;
