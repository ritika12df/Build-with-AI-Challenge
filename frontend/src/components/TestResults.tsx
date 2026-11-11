import {
  CheckCircle,
  XCircle,
  ClipboardCheck
} from "lucide-react";

interface TestResult {
  name: string;
  status: "passed" | "failed";
  message: string;
}

interface TestResultsProps {
  results: TestResult[];
  totalTests: number;
  passed: number;
  failed: number;
}

function TestResults({
  results,
  totalTests,
  passed,
  failed
}: TestResultsProps) {
  return (
    <section className="test-results">
      <div className="test-results-heading">
        <h2>Automated Test Results</h2>
        <ClipboardCheck size={24} />
      </div>

      <div className="test-results-summary">
        <div>
          <strong>{totalTests}</strong>
          <span>Total Tests</span>
        </div>

        <div>
          <strong>{passed}</strong>
          <span>Passed</span>
        </div>

        <div>
          <strong>{failed}</strong>
          <span>Failed</span>
        </div>
      </div>

      <div className="test-results-list">
        {results.map((test, index) => (
          <div className="test-result-item" key={index}>
            <div>
              {test.status === "passed" ? (
                <CheckCircle color="#55d69e" size={20} />
              ) : (
                <XCircle color="#ff7777" size={20} />
              )}
            </div>

            <div>
              <strong>{test.name}</strong>
              <p>{test.message}</p>
            </div>

            <span className={`test-status ${test.status}`}>
              {test.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestResults;