import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import { Download, Loader2, FlaskConical, AlertTriangle, X } from "lucide-react";
import { useForm } from "../context/formHooks.js";
import { populateDummyData } from "../utils/dummyData.js";

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

export default function StructuredFormNew({ template }) {
  const { state, dispatch } = useForm();

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Development dummy data handler
  const handlePopulateDummyData = () => {
    populateDummyData(dispatch);
  };

  const handleResetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  // Temporarily swap any unsupported color formats (e.g. oklch) for values
  // html2canvas can render, and hand back a function that restores them.
  const withPrintableColors = (root) => {
    const patched = [];

    root.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      const original = { color: el.style.color, backgroundColor: el.style.backgroundColor, borderColor: el.style.borderColor };
      let touched = false;

      if (style.color?.includes("oklch")) {
        el.style.color = "#000000";
        touched = true;
      }
      if (style.backgroundColor?.includes("oklch")) {
        el.style.backgroundColor = "#ffffff";
        touched = true;
      }
      if (style.borderColor?.includes("oklch")) {
        el.style.borderColor = "#e5e7eb";
        touched = true;
      }

      if (touched) patched.push({ el, original });
    });

    return () => {
      patched.forEach(({ el, original }) => {
        el.style.color = original.color;
        el.style.backgroundColor = original.backgroundColor;
        el.style.borderColor = original.borderColor;
      });
    };
  };

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      setError("Resume preview not found. Make sure it has id=\"resume-preview\".");
      return;
    }

    setError(null);
    setIsGenerating(true);

    const restoreColors = withPrintableColors(element);

    try {
      const opt = {
        margin: 0,
        filename: `${(state.name || "resume").replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          letterRendering: true,
          allowTaint: false,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation error:", err);
      setError(`Couldn't generate the PDF: ${err.message || "please try again."}`);
    } finally {
      restoreColors();
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-32">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Build your resume
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Fill in each section below — your preview updates as you type.
          </p>
        </div>

        {/* Development-only dummy data banner */}
        {import.meta.env.DEV && (
          <div className="mb-6 flex items-center justify-between gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <FlaskConical size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Development mode</p>
                <p className="text-xs text-amber-600 mt-0.5">Populate the form with sample data for testing.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetForm}
                className="flex-shrink-0 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm font-medium transition-colors"
              >
                Reset form
              </button>
              <button
                onClick={handlePopulateDummyData}
                className="flex-shrink-0 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-medium transition-colors"
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

      {/* Sticky download bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-center">
          <button
            onClick={downloadPDF}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-base font-semibold transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating PDF…
              </>
            ) : (
              <>
                <Download size={18} />
                Download PDF resume
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}