import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import TemplateSelector from "../components/TemplateSelector";
import { useForm } from "../context/formHooks.js";
import { extractResumeFromPdf } from "../utils/pdfResumeParser.js";

const INK = "#16233F";
const PAPER = "#FDFCF9";
const ACCENT = "#B8862E";
const MUTED = "#5B6472";
const LINE = "#E3DFD5";

function TemplateSelectionPage() {
  const navigate = useNavigate();
  const { dispatch } = useForm();

  const [template, setTemplate] = useState("template1");
  const [showStartModal, setShowStartModal] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState("");
  const importInputRef = useRef(null);

  const handleContinue = () => {
    setImportError("");
    setShowStartModal(true);
  };

  const handleStartFresh = () => {
    setShowStartModal(false);
    navigate(`/editor?template=${template}`);
  };

  const handleImportResume = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.type !== "application/pdf") {
      setImportError("Please choose a PDF resume.");
      return;
    }

    setIsImporting(true);
    setImportError("");

    try {
      const importedData = await extractResumeFromPdf(file);
      dispatch({ type: "SET_FORM_DATA", payload: importedData });
      setShowStartModal(false);
      navigate(`/editor?template=${template}`);
    } catch (error) {
      console.error("Resume PDF import error:", error);
      setImportError("Couldn't read that PDF. Scanned or image-only PDFs need OCR before import.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div style={{ backgroundColor: PAPER }} className="min-h-screen pb-28 sm:pb-0">
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: LINE }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium mb-4 sm:mb-5 inline-flex items-center gap-1"
            style={{ color: MUTED }}
          >
            ← Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-xs font-medium tracking-wide" style={{ color: ACCENT }}>
                Step 1 of 3
              </span>
              <h1
                className="font-serif text-2xl sm:text-3xl mt-1.5 tracking-tight"
                style={{ color: INK }}
              >
                Choose your template
              </h1>
              <p className="mt-2 text-sm sm:text-base max-w-md" style={{ color: MUTED }}>
                Pick a layout to start from — you can change it later
                without losing your details.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 sm:mt-7 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{ backgroundColor: i === 0 ? ACCENT : LINE }}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Template grid */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12">
        <TemplateSelector template={template} setTemplate={setTemplate} />

        {/* Desktop / tablet continue action */}
        <div className="hidden sm:flex justify-center mt-12">
          <button
            onClick={handleContinue}
            className="px-8 py-3.5 rounded-md text-white text-base font-medium transition-colors"
            style={{ backgroundColor: ACCENT }}
          >
            Use this template →
          </button>
        </div>
      </main>

      {showStartModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => !isImporting && setShowStartModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-resume-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                  Ready to begin
                </p>
                <h2 id="start-resume-title" className="mt-2 font-serif text-2xl" style={{ color: INK }}>
                  How would you like to start?
                </h2>
                <p className="mt-2 text-sm leading-6" style={{ color: MUTED }}>
                  Use your existing resume as a starting point, or begin with a clean template.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowStartModal(false)}
                disabled={isImporting}
                className="text-2xl leading-none text-slate-400 transition-colors hover:text-slate-700 disabled:opacity-50"
                aria-label="Close start options"
              >
                ×
              </button>
            </div>

            <input
              ref={importInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleImportResume}
              className="hidden"
            />

            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => importInputRef.current?.click()}
                disabled={isImporting}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60"
              >
                <span>
                  <span className="block font-semibold" style={{ color: INK }}>
                    {isImporting ? "Importing resume..." : "Import existing resume"}
                  </span>
                  <span className="mt-1 block text-xs" style={{ color: MUTED }}>
                    Upload a PDF and edit the extracted details.
                  </span>
                </span>
                <span className="text-xl" style={{ color: ACCENT }}>↑</span>
              </button>

              <button
                type="button"
                onClick={handleStartFresh}
                disabled={isImporting}
                className="flex items-center justify-between rounded-xl px-4 py-4 text-left text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: ACCENT }}
              >
                <span>
                  <span className="block font-semibold">Start with a new template</span>
                  <span className="mt-1 block text-xs text-white/75">Build your resume from a blank layout.</span>
                </span>
                <span className="text-xl">→</span>
              </button>
            </div>

            {importError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {importError}
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowStartModal(false)}
              disabled={isImporting}
              className="mt-5 w-full text-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile sticky action bar */}
      <div
        className="sm:hidden fixed bottom-0 inset-x-0 border-t px-5 py-4"
        style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
      >
        <button
          onClick={handleContinue}
          className="w-full py-3.5 rounded-md text-white text-base font-medium"
          style={{ backgroundColor: ACCENT }}
        >
          Use this template →
        </button>
      </div>
    </div>
  );
}

export default TemplateSelectionPage;