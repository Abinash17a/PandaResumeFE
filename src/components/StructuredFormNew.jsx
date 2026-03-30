import React from "react";
import html2pdf from "html2pdf.js";
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

export default function StructuredFormNew({ template }) {
  const { state, dispatch } = useForm();

  // Development dummy data handler
  const handlePopulateDummyData = () => {
    populateDummyData(dispatch);
  };

  // Simple and reliable PDF download with color conversion
  const downloadPDF = async (buttonElement) => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Resume preview not found. Make sure it has id='resume-preview'.");
      return;
    }

    let originalButtonText = '';
    try {
      // Show loading state
      if (buttonElement) {
        originalButtonText = buttonElement.textContent;
        buttonElement.textContent = "Generating PDF...";
        buttonElement.disabled = true;
      }

      // Convert unsupported color formats before PDF generation
      const convertColors = (element) => {
        const elementsWithColor = element.querySelectorAll('*');
        elementsWithColor.forEach(el => {
          const style = window.getComputedStyle(el);
          const color = style.color;
          const bgColor = style.backgroundColor;
          const borderColor = style.borderColor;

          // Convert oklch colors to fallback colors
          if (color && color.includes('oklch')) {
            el.style.color = '#000000'; // Fallback to black
          }
          if (bgColor && bgColor.includes('oklch')) {
            el.style.backgroundColor = '#ffffff'; // Fallback to white
          }
          if (borderColor && borderColor.includes('oklch')) {
            el.style.borderColor = '#e5e7eb'; // Fallback to gray
          }
        });
      };

      // Apply color conversion
      convertColors(element);

      // Simple configuration that should work
      const opt = {
        margin: 10,
        filename: `${(state.name || "resume").replace(/\s+/g, "_")}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          letterRendering: true,
          allowTaint: false
        },
        jsPDF: { 
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Generate PDF
      await html2pdf().set(opt).from(element).save();

    } catch (error) {
      console.error('PDF generation error:', error);
      alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. Please try again.`);
    } finally {
      // Restore button state
      if (buttonElement && originalButtonText) {
        buttonElement.textContent = originalButtonText;
        buttonElement.disabled = false;
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8 pb-3 border-b-4 border-indigo-100">
        Professional Resume Builder
      </h2>

      {/* Development-only dummy data button */}
      {import.meta.env.DEV && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-yellow-800">Development Mode</h4>
              <p className="text-xs text-yellow-600">Populate form with dummy data for testing</p>
            </div>
            <button
              onClick={handlePopulateDummyData}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm font-medium"
            >
              Fill Dummy Data
            </button>
          </div>
        </div>
      )}

      {/* Render all form sections */}
      <BasicInfoSection template={template} />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <CertificationsSection />
      <ProjectsSection />
      <AchievementsSection />
      <LanguagesSection />
      <InterestsSection />

      {/* Download Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={(e) => downloadPDF(e.currentTarget)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg font-semibold"
        >
          Download PDF Resume
        </button>
      </div>
    </div>
  );
}
