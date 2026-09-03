import React, { useMemo, useState } from "react";
import { Monitor, Type, FileText, AlertCircle, Target, Minus, Plus, Maximize2 } from "lucide-react";
import Template1 from "../templates/template1";
import Template2 from "../templates/template2";
import ATSModal from "./ATSModal";

const ZOOM_MIN = 50;
const ZOOM_MAX = 200;
const ZOOM_STEP = 5;
const ZOOM_DEFAULT = 100;

export default function Preview({
  data,
  template,
  fontSize,
  setFontSize,
  fontSizeConfig,
  previewId = "resume-preview"
}) {

  const [showATSModal, setShowATSModal] = useState(false);
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const [compactMode, setCompactMode] = useState(false);

  const compactSuggestions = [
    "Reduce margins",
    "Tighten line spacing",
    "Switch to a more condensed template",
    "Remove older roles or generic bullets",
  ];

  const clampZoom = (value) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value));
  const zoomOut = () => setZoom((z) => clampZoom(z - ZOOM_STEP));
  const zoomIn = () => setZoom((z) => clampZoom(z + ZOOM_STEP));
  const resetZoom = () => setZoom(ZOOM_DEFAULT);

  // Helper function to strip HTML tags
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  const formattedData = useMemo(() => {
    if (!data) return null;

    const formatRange = (start, end, isCurrent) => {
      if (!start && !end && !isCurrent) return "";
      return ` (${start}${end ? ' - ' + end : isCurrent ? ' - Present' : ''})`;
    };

    return {
      ...data,
      summary: data.summary || "",

      experience: data.experiences?.map(exp =>
        `${exp.title} at ${exp.company}${formatRange(exp.startDate, exp.endDate, exp.current)}\n${stripHtml(exp.description || '')}`
      ).join('\n\n') || "",

      education: data.educationItems?.map(edu =>
        `${edu.degree}, ${edu.school}${formatRange(edu.startDate, edu.endDate, edu.current)}${edu.gpa ? `\nGPA: ${edu.gpa}` : ''}${edu.notes ? `\n${stripHtml(edu.notes)}` : ''}`
      ).join('\n\n') || "",

      skills: [...(data.technicalSkills || []), ...(data.nonTechnicalSkills || [])].join(', '),

      certifications: data.certifications?.map(cert =>
        `${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}${cert.date ? ` (${cert.date})` : ''}${cert.expiryDate ? ` - Expires: ${cert.expiryDate}` : ''}`
      ).join('\n') || "",

      projects: data.projects?.map(proj =>
        `${proj.title}\n${stripHtml(proj.description || '')}${proj.technologies ? `\nTechnologies: ${proj.technologies}` : ''}${proj.link ? `\nLink: ${proj.link}` : ''}`
      ).join('\n\n') || "",

      achievements: data.achievements?.join('\n\n') || "",
      languages: data.languages?.map(lang => `${lang.language} (${lang.proficiency})`).join(', ') || "",
      interests: data.interests?.join(', ') || ""
    };
  }, [data]);

  const activeFontConfig = fontSizeConfig || {};
  const compactTemplateConfig = useMemo(() => ({
    ...activeFontConfig,
    ...(compactMode ? {
      lineHeight: "leading-tight",
      letterSpacing: "tracking-tight",
      sectionMargin: "mb-1.5",
      itemMargin: "mb-1",
      sectionPadding: "p-1.5",
      borderRadius: "rounded-sm",
    } : {})
  }), [activeFontConfig, compactMode]);

  const exceedsA4 = useMemo(() => {
    if (!formattedData) return false;

    const allContent = [
      formattedData.summary,
      formattedData.experience,
      formattedData.education,
      formattedData.skills,
      formattedData.projects,
      formattedData.certifications,
      formattedData.achievements,
      formattedData.languages,
      formattedData.interests,
    ].filter(Boolean).join(" ");

    const words = allContent.trim().split(/\s+/).filter(Boolean).length;
    const lines = allContent
      .split(/\n|\s{2,}/)
      .filter((line) => line && line.trim().length > 0).length;

    return words > 520 || lines > 35;
  }, [formattedData]);

  // Ctrl/Cmd + scroll to zoom the preview
  const handleWheel = (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    setZoom((z) => clampZoom(z - Math.sign(e.deltaY) * ZOOM_STEP));
  };

  // Extract resume text as single line string for ATS API
  const getResumeText = () => {
    if (!formattedData) return '';

    const sections = [];

    if (data?.personalInfo?.name) {
      sections.push(data.personalInfo.name);
    }

    if (data?.personalInfo?.email || data?.personalInfo?.phone) {
      const contact = [data.personalInfo.email, data.personalInfo.phone].filter(Boolean).join(' | ');
      sections.push(contact);
    }

    if (formattedData.experience) {
      sections.push('EXPERIENCE');
      sections.push(formattedData.experience);
    }

    if (formattedData.education) {
      sections.push('EDUCATION');
      sections.push(formattedData.education);
    }

    if (formattedData.skills) {
      sections.push('SKILLS');
      sections.push(formattedData.skills);
    }

    if (formattedData.projects) {
      sections.push('PROJECTS');
      sections.push(formattedData.projects);
    }

    if (formattedData.certifications) {
      sections.push('CERTIFICATIONS');
      sections.push(formattedData.certifications);
    }

    if (formattedData.achievements) {
      sections.push('ACHIEVEMENTS');
      sections.push(formattedData.achievements);
    }

    if (formattedData.languages) {
      sections.push('LANGUAGES');
      sections.push(formattedData.languages);
    }

    if (formattedData.interests) {
      sections.push('INTERESTS');
      sections.push(formattedData.interests);
    }

    return sections.join(' ').replace(/\s+/g, ' ').trim();
  };

  const renderTemplate = () => {
    const templates = {
      template1: (
        <Template1
          data={formattedData}
          previewId={previewId}
          fontSizeConfig={compactTemplateConfig}
          spacingConfig={compactMode ? {
            lineHeight: "leading-tight",
            letterSpacing: "tracking-tight",
            sectionMargin: "mb-1.5",
            itemMargin: "mb-1",
            sectionPadding: "p-1.5",
            borderRadius: "rounded-sm",
          } : {}}
        />
      ),
      template2: (
        <Template2
          data={formattedData}
          previewId={previewId}
          fontSizeConfig={compactTemplateConfig}
          spacingConfig={compactMode ? {
            lineHeight: "leading-tight",
            letterSpacing: "tracking-tight",
            sectionMargin: "mb-1.5",
            itemMargin: "mb-1",
            sectionPadding: "p-1.5",
            borderRadius: "rounded-sm",
          } : {}}
        />
      ),
    };

    if (templates[template]) {
      return templates[template];
    }

    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-pulse">
        <FileText size={48} strokeWidth={1} className="mb-4" />
        <p className="text-lg font-medium">Select a template to generate preview</p>
        <p className="text-sm">Your changes will reflect here in real-time</p>
      </div>
    );
  };

  const firstName = data?.personalInfo?.name?.split(' ')[0];
  const docTitle = firstName ? `${firstName}'s Resume` : "Untitled Resume";

  return (
    <>
      <div className="flex-1 flex flex-col h-full bg-slate-100/50 relative">
        {/* Sticky Header Toolbar */}
        <header className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Monitor size={20} />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 p-1 rounded-xl w-fit">
              <div className="hidden sm:flex items-center px-2 text-gray-500">
                <Type size={16} />
              </div>
              {["small", "medium", "large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`
                    relative px-2 sm:px-4 py-1.5 text-sm font-semibold capitalize transition-all duration-200 rounded-lg
                    ${fontSize === size
                      ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }
                  `}
                >
                  <span className="hidden sm:inline">{size}</span>
                  <span className="sm:hidden">{size.charAt(0).toUpperCase()}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCompactMode((prev) => !prev)}
              aria-pressed={compactMode}
              className={`
                flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors
                ${compactMode
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <Maximize2 size={16} />
              {compactMode ? "Compact on" : "A4 fit"}
            </button>

            {/* ATS Checker Button - disabled for now */}
            <button
              disabled
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed opacity-60"
              aria-label="ATS Checker disabled"
            >
              <Target size={16} />
              ATS Checker
            </button>

            {/* Mobile: Icon-only button - disabled for now */}
            <button
              disabled
              className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed opacity-60"
              aria-label="ATS Checker disabled"
            >
              <Target size={16} />
            </button>
          </div>
        </header>

        {/* Live preview info bar */}
        <div className="flex items-start justify-between gap-4 px-4 md:px-8 lg:px-12 pt-4 pb-2">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-gray-400">
              LIVE PREVIEW
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">
              {docTitle} <span className="font-normal text-gray-400">· A4 · 1 page</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
              Pinch or Ctrl + scroll to zoom the document
            </p>
          </div>

          <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-500">
            ATS Score
            <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-[10px] font-semibold text-gray-400">
              COMING SOON
            </span>
          </span>
        </div>

        {exceedsA4 && (
          <div className="mx-4 md:mx-8 lg:mx-12 mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs font-medium text-amber-900 shadow-sm">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">This exceeds single-page A4</div>
                <div className="mt-1 text-[11px] text-amber-800">
                  Try reducing margins, tightening line spacing, switching to a condensed template, or trimming older roles.
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {compactSuggestions.map((tip) => (
                    <span
                      key={tip}
                      className="inline-flex items-center rounded-full border border-amber-200 bg-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-800"
                    >
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Preview Area */}
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 lg:p-12 pb-28 custom-scrollbar"
          onWheel={handleWheel}
        >
          <div
            className="mx-auto w-full transition-transform duration-150 ease-out"
            style={{
              width: "100%",
              maxWidth: "min(794px, calc(100vw - 2rem))",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            {/* Shadow & Paper Effect */}
            <div className="
              relative
              w-full
              bg-white
              shadow-[0_20px_50px_rgba(0,0,0,0.1)]
              transition-transform
              duration-500
              ease-out
              hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]
              min-h-264 /* Standard A4 Aspect Ratio Base */
            ">
              <div className="origin-top transition-all duration-300">
                {renderTemplate()}
              </div>

              {/* Subtle Page Edge Decor */}
              <div className="absolute inset-0 pointer-events-none border border-gray-100 ring-1 ring-black/5" />
            </div>

            {/* Footer Tip */}
            <p className="mt-8 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <AlertCircle size={12} />
              Tip: Use the "Large" font setting for better readability on printed copies.
            </p>
          </div>
        </main>

        {/* Zoom control bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900 text-white shadow-lg">
          <button
            onClick={zoomOut}
            disabled={zoom <= ZOOM_MIN}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>

          <input
            type="range"
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            step={ZOOM_STEP}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-24 accent-indigo-500"
            aria-label="Zoom level"
          />

          <span className="text-xs font-medium tabular-nums w-9 text-center">
            {zoom}%
          </span>

          <button
            onClick={zoomIn}
            disabled={zoom >= ZOOM_MAX}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>

          <div className="w-px h-4 bg-white/20" />

          <button
            onClick={resetZoom}
            className="flex items-center gap-1.5 text-xs font-medium hover:text-indigo-300 transition-colors"
          >
            <Maximize2 size={13} />
            Fit
          </button>
        </div>
      </div>

      {/* ATS Modal - Outside main container to prevent layout shifts */}
      <ATSModal
        isOpen={showATSModal}
        onClose={() => setShowATSModal(false)}
        resumeText={getResumeText()}
      />
    </>
  );
}