import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { Download, Loader2, FlaskConical, AlertTriangle, X, Upload, Printer } from "lucide-react";
import { useForm } from "../context/formHooks.js";
import { populateDummyData } from "../utils/dummyData.js";
import { extractResumeFromPdf } from "../utils/pdfResumeParser.js";

// Import all section components
import BasicInfoSection from "./FormSections/BasicInfoSection.jsx";
import ExperienceSection from "./FormSections/ExperienceSection.jsx";
import EducationSection from "./FormSections/EducationSection.jsx";
import SkillsSection from "./FormSections/SkillsSection.jsx";
import CertificationsSection from "./FormSections/CertificationsSection.jsx";
import ProjectsSection from "./FormSections/ProjectsSection.jsx";
import AchievementsSection from "./FormSections/AchievementsSection.jsx";
import LanguagesSection from "./FormSections/LanguagesSection.jsx";
import InterestsSection from "./FormSections/InterestsSection.jsx";

const SECTIONS = [
  { key: "basic", label: "Basic info", Component: BasicInfoSection, needsTemplate: true },
  { key: "experience", label: "Experience", Component: ExperienceSection },
  { key: "education", label: "Education", Component: EducationSection },
  { key: "skills", label: "Skills", Component: SkillsSection },
  { key: "certifications", label: "Certifications", Component: CertificationsSection },
  { key: "projects", label: "Projects", Component: ProjectsSection },
  { key: "achievements", label: "Achievements", Component: AchievementsSection },
  { key: "languages", label: "Languages", Component: LanguagesSection },
  { key: "interests", label: "Interests", Component: InterestsSection },
];

const convertOklchToRgb = (value) => {
  const match = value.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+)(?:deg)?(?:\s*\/\s*([\d.]+%?))?\s*\)/i);
  if (!match) return value;

  const lightness = parseFloat(match[1]) / (match[1].endsWith("%") ? 100 : 1);
  const chroma = parseFloat(match[2]) * (match[2].endsWith("%") ? 0.004 : 1);
  const hue = (parseFloat(match[3]) * Math.PI) / 180;
  const alpha = match[4]
    ? parseFloat(match[4]) / (match[4].endsWith("%") ? 100 : 1)
    : 1;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const toSrgb = (channel) => {
    const value = 12.92 * channel <= 0.0031308
      ? 12.92 * channel
      : 1.055 * Math.max(channel, 0) ** (1 / 2.4) - 0.055;
    return Math.round(Math.max(0, Math.min(1, value)) * 255);
  };
  const red = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const green = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const blue = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return alpha < 1
    ? `rgba(${toSrgb(red)}, ${toSrgb(green)}, ${toSrgb(blue)}, ${alpha})`
    : `rgb(${toSrgb(red)}, ${toSrgb(green)}, ${toSrgb(blue)})`;
};

const makeCanvasSafe = (document) => {
  const properties = [
    "color",
    "backgroundColor",
    "backgroundImage",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "outlineColor",
    "textDecorationColor",
    "boxShadow",
    "fill",
    "stroke",
  ];

  document.querySelectorAll("*").forEach((element) => {
    const computedStyle = document.defaultView.getComputedStyle(element);
    properties.forEach((property) => {
      const value = computedStyle[property];
      if (value?.includes("oklch")) {
        element.style[property] = value.replace(/oklch\([^)]*\)/gi, convertOklchToRgb);
      }
    });
  });
};

export default function StructuredFormNew({ template, previewId = "resume-preview", onBeforePrint, onBeforeDownload }) {
  const { state, dispatch } = useForm();

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const importInputRef = useRef(null);

  // Development dummy data handler
  const handlePopulateDummyData = () => {
    populateDummyData(dispatch);
  };

  const handleResetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleImportResume = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please choose a PDF resume.");
      return;
    }

    try {
      const importedData = await extractResumeFromPdf(file);
      dispatch({ type: "SET_FORM_DATA", payload: importedData });
      setError(null);
    } catch (importError) {
      console.error("Resume PDF import error:", importError);
      setError("Couldn't read that PDF. Scanned or image-only PDFs need OCR before import.");
    }
  };

  const downloadPDF = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      const resumeElement = document.getElementById(previewId);
      if (!resumeElement) {
        if (onBeforeDownload) {
          onBeforeDownload();
          window.setTimeout(() => downloadPDF(), 100);
          return;
        }
        throw new Error("Open the resume preview before downloading.");
      }

      // Export a detached A4-width copy so editor zoom and responsive wrappers
      // cannot change the document geometry captured by html2pdf.
      const exportHost = document.createElement("div");
      const exportElement = resumeElement.cloneNode(true);
      const previewWidth = Math.round(resumeElement.getBoundingClientRect().width);
      const exportWidth = Math.max(1, previewWidth);
      const exportHeight = Math.round(exportWidth * (1124 / 795));
      exportHost.style.cssText = `position: fixed; left: -10000px; top: 0; width: ${exportWidth}px; background: #fff;`;
      exportElement.style.width = `${exportWidth}px`;
      exportElement.style.maxWidth = `${exportWidth}px`;
      exportElement.style.minHeight = `${exportHeight}px`;
      exportElement.style.height = `${exportHeight}px`;
      exportElement.style.overflow = "hidden";
      exportElement.style.transform = "none";
      document.body.appendChild(exportHost);
      exportHost.appendChild(exportElement);

      try {
        const canvas = await html2canvas(exportElement, {
          scale: 2,
          width: exportWidth,
          height: exportHeight,
          windowWidth: exportWidth,
          useCORS: true,
          backgroundColor: "#ffffff",
          onclone: makeCanvasSafe,
        });
        const pdf = await html2pdf()
          .set({
            margin: 0,
            filename: `${(state.name || "resume").replace(/\s+/g, "_")}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(canvas)
          .toPdf()
          .get("pdf");
        pdf.save(`${(state.name || "resume").replace(/\s+/g, "_")}.pdf`);
      } finally {
        exportHost.remove();
      }
    } catch (err) {
      console.error("PDF generation error:", err);
      setError(`Couldn't generate the PDF: ${err.message || "please try again."}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const printPDF = () => {
    setError(null);
    if (onBeforePrint) {
      onBeforePrint();
      window.setTimeout(() => window.print(), 100);
      return;
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-20 sm:pb-32">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Build your resume
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Fill in each section below — your preview updates as you type.
              </p>
            </div>
            <div>
              <input
                ref={importInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleImportResume}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => importInputRef.current?.click()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto"
              >
                <Upload size={17} />
                Import resume
              </button>
              <p className="mt-1 text-center text-[11px] text-slate-400 sm:text-right">PDF file</p>
            </div>
          </div>
        </div>

        {/* Development-only dummy data banner */}
        {import.meta.env.DEV && (
          <div className="mb-6 flex flex-col gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <FlaskConical size={18} className="text-amber-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-amber-800">Development mode</p>
                <p className="text-xs text-amber-600 mt-0.5">Populate the form with sample data for testing.</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto shrink-0 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm font-medium transition-colors"
              >
                Reset form
              </button>
              <button
                onClick={handlePopulateDummyData}
                className="w-full sm:w-auto shrink-0 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-medium transition-colors"
              >
                Fill sample data
              </button>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
            <p className="flex-1 text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Form sections */}
        <div className="space-y-6">
          {SECTIONS.map(({ key, Component, needsTemplate }) => (
            <section
              key={key}
              className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm"
            >
              <Component {...(needsTemplate ? { template } : {})} />
            </section>
          ))}
        </div>
      </div>

      {/* Floating mobile/download action */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:hidden">
        <button
          onClick={printPDF}
          aria-label="Print or save PDF resume"
          title="Print or save PDF resume"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-700 text-white shadow-lg transition hover:bg-slate-800"
        >
          <Printer size={20} />
        </button>
        <button
          onClick={downloadPDF}
          disabled
          aria-label="Download PDF resume"
          title="Download PDF resume"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isGenerating ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Download size={20} />
          )}
        </button>
      </div>

      {/* Desktop download bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 hidden border-t border-slate-200 bg-slate-50/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm shadow-[0_-2px_10px_rgba(15,23,42,0.08)] sm:block print:hidden">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4 flex justify-center">
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              onClick={printPDF}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 text-base font-semibold transition-colors"
            >
              <Printer size={18} />
              Print / Save as PDF
            </button>
            <button
              onClick={downloadPDF}
              disabled
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed text-base font-semibold transition-colors"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating PDF…
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download image PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}