import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [code, setCode] = useState(`//Enter your code here\n`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/ai/get-review`, { code });
      setReview(response.data);
    } catch (err) {
      console.error(err);
      setError(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Could not reach the server. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero">
      <div className="logo">
        <img src="logo.png" alt="CodeSage" />
      </div>

      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code","Fira Mono",monospace',
                fontSize: 15,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
          </div>
          <div
            onClick={!loading ? reviewCode : undefined}
            className={`review ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <div className="spinner-wrapper">
                <div className="spinner"></div>
                Reviewing...
              </div>
            ) : (
              "Review"
            )}
          </div>
        </div>

        <div className="right">
          {error && <p className="error">{error}</p>}
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </div>
  );
}

export default App;
