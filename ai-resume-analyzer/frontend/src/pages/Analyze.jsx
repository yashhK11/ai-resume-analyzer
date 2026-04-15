import { useState } from "react";
import ResultCard from "../components/ResultCard";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function Analyze() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setFileLoading(true);
    setError("");

    try {
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + "\n";
        }
        setResumeText(text);
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const extracted = await mammoth.extractRawText({ arrayBuffer });
        setResumeText(extracted.value);
      } else {
        setError("Only PDF or Word (.docx) files are supported");
      }
    } catch {
      setError("Failed to read file. Try pasting text manually.");
    } finally {
      setFileLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim())
      return setError("Please paste your resume text or upload a file");
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resumeText }),
        },
      );
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setResult(data);
    } catch {
      setError("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFileName("");
    setResumeText("");
    setResult(null);
    setError("");
  };

  return (
    <div
      style={{ backgroundColor: "#0d1117", minHeight: "100vh" }}
      className="py-5"
    >
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="mb-4">
          <h2 className="text-white fw-bold mb-1">Analyze Resume</h2>
          <p className="text-secondary">
            Upload your resume file or paste text below
          </p>
        </div>

        <div className="card-dark p-4 mb-4">
          <label className="form-label text-secondary small">
            Upload Resume File
          </label>
          <div
            className="border border-secondary rounded-3 p-4 text-center"
            style={{ backgroundColor: "#0d1117", cursor: "pointer" }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            {fileLoading ? (
              <>
                <span className="spinner-border spinner-border-sm text-primary me-2" />
                Reading file...
              </>
            ) : fileName ? (
              <div>
                <span className="text-success">✅ {fileName}</span>
                <p className="text-secondary small mb-0 mt-1">
                  File loaded! Ready to analyze.
                </p>
                <button
                  className="btn btn-outline-secondary btn-sm mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div>
                <div className="fs-2 mb-2">📄</div>
                <p className="text-white mb-1">
                  Click to upload PDF or Word file
                </p>
                <p className="text-secondary small mb-0">
                  Supports .pdf and .docx
                </p>
              </div>
            )}
          </div>
        </div>

        {!fileName && (
          <div className="card-dark p-4 mb-4">
            <label className="form-label text-secondary small">
              Or Paste Resume Text
            </label>
            <textarea
              rows={10}
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="form-control"
              style={{
                fontFamily: "monospace",
                fontSize: "0.85rem",
                lineHeight: "1.6",
              }}
            />
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <button
          onClick={handleAnalyze}
          disabled={loading || fileLoading}
          className="btn btn-primary w-100 py-3 fw-semibold"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Analyzing with AI...
            </>
          ) : (
            "Analyze Resume →"
          )}
        </button>

        {loading && (
          <p className="text-secondary text-center mt-3 small">
            This may take a few seconds...
          </p>
        )}
      </div>

      {result && <ResultCard result={result} />}
    </div>
  );
}
