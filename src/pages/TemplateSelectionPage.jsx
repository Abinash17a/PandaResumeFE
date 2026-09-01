import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TemplateSelector from "../components/TemplateSelector";

const INK = "#16233F";
const PAPER = "#FDFCF9";
const ACCENT = "#B8862E";
const MUTED = "#5B6472";
const LINE = "#E3DFD5";

function TemplateSelectionPage() {
  const navigate = useNavigate();

  const [template, setTemplate] = useState("template1");

  const handleContinue = () => {
    navigate(`/editor?template=${template}`);
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