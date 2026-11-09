
import { useState } from "react";
import axios from "axios";
import { Globe, Play, Link2 } from "lucide-react";

function WebsiteTester() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate the website URL
  const isValidUrl = () => {
    try {
      const parsedUrl = new URL(websiteUrl.trim());

      return (
        (parsedUrl.protocol === "http:" ||
          parsedUrl.protocol === "https:") &&
        parsedUrl.hostname.length > 0
      );
    } catch {
      return false;
    }
  };

  // Send URL to the FastAPI backend
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!isValidUrl()) {
      setMessage("Please enter a valid website URL.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await axios.post(
        "https://expert-xylophone-555jq96qgjpcv6v5-8000.app.github.dev/api/tests/prepare",
        {
          url: websiteUrl.trim()
        }
      );

      setMessage(response.data.message);
      setIsSuccess(true);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail ||
          "Could not connect to the backend. Please try again.";

        setMessage(errorMessage);
      } else {
        setMessage("Something went wrong. Please try again.");
      }

      setIsSuccess(false);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="website-tester">

      <div className="tester-heading">
        <div className="tester-icon">
          <Globe size={22} />
        </div>

        <div>
          <h2>Test a Website</h2>
          <p>
            Enter a website URL to prepare an automated test.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <label htmlFor="website-url">
          Website URL
        </label>

        <div className="url-input-wrapper">

          <Link2 size={19} />

          <input
            id="website-url"
            type="url"
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(event) => {
              setWebsiteUrl(event.target.value);
              setMessage("");
              setIsSuccess(false);
            }}
            required
          />

          <button
            type="submit"
            disabled={!isValidUrl() || isLoading}
          >
            <Play size={17} />

            {isLoading ? "Connecting..." : "Start Testing"}
          </button>

        </div>

        {message && (
          <p
            className={`tester-message ${
              isSuccess ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <p className="tester-hint">
          Supported URLs: HTTP and HTTPS websites.
        </p>

      </form>
    </section>
  );
}

export default WebsiteTester;
