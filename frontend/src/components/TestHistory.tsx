import { useState } from "react";
import {
  History,
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image
} from "lucide-react";

interface TestRun {
  id: number;
  website_url: string;
  created_at: string;
  total_tests: number;
  passed: number;
  failed: number;
  screenshot_path: string | null;
  results: {
    name: string;
    status: "passed" | "failed";
    message: string;
  }[];
}

interface TestHistoryProps {
  history: TestRun[];
  loading: boolean;
  onRefresh: () => void;
}

function TestHistory({
  history,
  loading,
  onRefresh
}: TestHistoryProps) {
  const [expandedRunId, setExpandedRunId] = useState<number | null>(null);

  const backendUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

  const toggleDetails = (id: number) => {
    setExpandedRunId((current) => current === id ? null : id);
  };

  return (
    <section className="test-history">
      <div className="test-history-heading">
        <div>
          <h2>Test History</h2>
          <p>Previously executed website tests</p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="history-refresh-button"
        >
          <History size={17} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading && history.length === 0 ? (
        <p>Loading test history...</p>
      ) : history.length === 0 ? (
        <div className="empty-history">
          <History size={30} />
          <p>No previous test runs found.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((run) => (
            <div className="history-item" key={run.id}>
              <div className="history-item-main">
                <div className="history-item-title">
                  <strong>{run.website_url}</strong>
                  <span>Run #{run.id}</span>
                </div>

                <p>
                  {new Date(run.created_at).toLocaleString()}
                </p>

                <div className="history-stats">
                  <span>
                    <History size={15} />
                    {run.total_tests} Tests
                  </span>

                  <span className="history-passed">
                    <CheckCircle size={15} />
                    {run.passed} Passed
                  </span>

                  <span className="history-failed">
                    <XCircle size={15} />
                    {run.failed} Failed
                  </span>
                </div>

                <button
                  className="history-details-button"
                  onClick={() => toggleDetails(run.id)}
                >
                  {expandedRunId === run.id ? (
                    <>
                      Hide Details <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      View Details <ChevronDown size={16} />
                    </>
                  )}
                </button>

                {expandedRunId === run.id && (
                  <div className="history-details">
                    <h3>Test Results</h3>

                    {run.results.map((test, index) => (
                      <div
                        className="history-test-result"
                        key={`${test.name}-${index}`}
                      >
                        {test.status === "passed" ? (
                          <CheckCircle color="#55d69e" size={18} />
                        ) : (
                          <XCircle color="#ff7777" size={18} />
                        )}

                        <div>
                          <strong>{test.name}</strong>
                          <p>{test.message}</p>
                        </div>

                        <span className={`test-status ${test.status}`}>
                          {test.status}
                        </span>
                      </div>
                    ))}

                    {run.screenshot_path && backendUrl && (
                      <a
                        href={`${backendUrl}${run.screenshot_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="history-screenshot-link"
                      >
                        <Image size={17} />
                        View Screenshot
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <a
                href={run.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="history-open-link"
                title="Open website"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TestHistory;
