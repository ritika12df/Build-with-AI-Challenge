
import { useState } from "react";
import axios from "axios";
import {
  Globe,
  Search,
  Loader2,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
  MousePointerClick,
  FileText,
  ExternalLink
} from "lucide-react";

interface WebsiteLink {
  text: string;
  href: string;
}

interface WebsiteButton {
  text: string;
  type: string;
}

interface FormField {
  name: string;
  type: string;
  placeholder: string;
}

interface WebsiteForm {
  action: string;
  method: string;
  fields: FormField[];
}

interface ExploreResult {
  success: boolean;
  requested_url: string;
  final_url: string;
  title: string;
  status_code: number | null;
  summary: {
    total_links: number;
    total_buttons: number;
    total_forms: number;
  };
  links: WebsiteLink[];
  buttons: WebsiteButton[];
  forms: WebsiteForm[];
  message: string;
}

function WebsiteTester() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [result, setResult] = useState<ExploreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplore = async () => {
    setError("");
    setResult(null);

    const trimmedUrl = websiteUrl.trim();

    if (!trimmedUrl) {
      setError("Please enter a website URL.");
      return;
    }

    let validUrl: URL;

    try {
      validUrl = new URL(trimmedUrl);
    } catch {
      setError("Please enter a valid website URL.");
      return;
    }

    if (!["http:", "https:"].includes(validUrl.protocol)) {
      setError("Only HTTP and HTTPS websites are supported.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<ExploreResult>(
        `${import.meta.env.VITE_API_BASE_URL}/api/tests/explore`,
        { url: trimmedUrl }
      );

      setResult(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.detail ||
          "Unable to explore this website. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="explorer-section">
      <div className="explorer-heading">
        <div>
          <h2>Website Explorer</h2>
          <p>Enter a website URL to inspect its structure.</p>
        </div>
        <Globe size={25} />
      </div>

      <div className="explorer-input-area">
        <input
          type="url"
          value={websiteUrl}
          onChange={(event) => setWebsiteUrl(event.target.value)}
          placeholder="https://example.com"
          disabled={loading}
        />

        <button
          onClick={handleExplore}
          disabled={loading}
          className="explore-button"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="spin-icon" />
              Exploring...
            </>
          ) : (
            <>
              <Search size={17} />
              Explore Website
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="explorer-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="explorer-results">
          <div className="explorer-success">
            <CheckCircle size={19} />
            <span>{result.message}</span>
          </div>

          <div className="explorer-page-info">
            <h3>{result.title || "Untitled Website"}</h3>

            <a
              href={result.final_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.final_url}
              <ExternalLink size={14} />
            </a>

            <span className="status-code">
              HTTP {result.status_code ?? "Unknown"}
            </span>
          </div>

          <div className="explorer-stats">
            <div className="explorer-stat">
              <LinkIcon size={20} />
              <strong>{result.summary.total_links}</strong>
              <span>Links</span>
            </div>

            <div className="explorer-stat">
              <MousePointerClick size={20} />
              <strong>{result.summary.total_buttons}</strong>
              <span>Buttons</span>
            </div>

            <div className="explorer-stat">
              <FileText size={20} />
              <strong>{result.summary.total_forms}</strong>
              <span>Forms</span>
            </div>
          </div>

          <div className="explorer-detail-section">
            <h3>Detected Links</h3>

            {result.links.length === 0 ? (
              <p className="explorer-empty">No links detected.</p>
            ) : (
              <ul className="explorer-list">
                {result.links.map((link, index) => (
                  <li key={`${link.href}-${index}`}>
                    <span>{link.text || "Unnamed link"}</span>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open <ExternalLink size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="explorer-detail-section">
            <h3>Detected Buttons</h3>

            {result.buttons.length === 0 ? (
              <p className="explorer-empty">No buttons detected.</p>
            ) : (
              <ul className="explorer-list">
                {result.buttons.map((button, index) => (
                  <li key={index}>
                    <span>{button.text || "Unnamed button"}</span>
                    <span className="element-type">{button.type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="explorer-detail-section">
            <h3>Detected Forms</h3>

            {result.forms.length === 0 ? (
              <p className="explorer-empty">No forms detected.</p>
            ) : (
              result.forms.map((form, index) => (
                <div className="explorer-form" key={index}>
                  <p>
                    Method: <strong>{form.method}</strong>
                  </p>
                  <p>
                    Action: <span>{form.action || "Not specified"}</span>
                  </p>

                  <p>Input fields: {form.fields.length}</p>

                  {form.fields.map((field, fieldIndex) => (
                    <div
                      className="explorer-field"
                      key={fieldIndex}
                    >
                      <span>{field.name || "Unnamed field"}</span>
                      <span>{field.type}</span>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default WebsiteTester;
