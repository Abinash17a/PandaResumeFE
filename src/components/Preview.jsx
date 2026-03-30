import React, { useMemo, useState } from "react";
import { Monitor, Type, FileText, AlertCircle, Target } from "lucide-react"; // Optional: Install lucide-react for icons
import Template1 from "../templates/template1";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import ATSModal from "./ATSModal";

export default function Preview({
  data,
  template,
  fontSize,
  setFontSize,
  fontSizeConfig
}) {
  
  const [showATSModal, setShowATSModal] = useState(false);

  // Memoize formatting to optimize performance during live typing
  const formattedData = useMemo(() => {
    if (!data) return null;

    const formatRange = (start, end, isCurrent) => {
      if (!start && !end && !isCurrent) return "";
      return ` (${start}${end ? ' - ' + end : isCurrent ? ' - Present' : ''})`;
    };

    return {
      ...data,
      experience: data.experiences?.map(exp => 
        `${exp.title} at ${exp.company}${formatRange(exp.startDate, exp.endDate, exp.current)}\n${exp.description || ''}`
      ).join('\n\n') || "",
      
      education: data.educationItems?.map(edu => 
        `${edu.degree}, ${edu.school}${formatRange(edu.startDate, edu.endDate, edu.current)}${edu.gpa ? `\nGPA: ${edu.gpa}` : ''}${edu.notes ? `\n${edu.notes}` : ''}`
      ).join('\n\n') || "",
      
      skills: [...(data.technicalSkills || []), ...(data.nonTechnicalSkills || [])].join(', '),
      
      certifications: data.certifications?.map(cert => 
        `${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}${cert.date ? ` (${cert.date})` : ''}${cert.expiryDate ? ` - Expires: ${cert.expiryDate}` : ''}`
      ).join('\n') || "",
      
      projects: data.projects?.map(proj => 
        `${proj.title}\n${proj.description}${proj.technologies ? `\nTechnologies: ${proj.technologies}` : ''}${proj.link ? `\nLink: ${proj.link}` : ''}`
      ).join('\n\n') || "",
      
      achievements: data.achievements?.join('\n\n') || "",
      languages: data.languages?.map(lang => `${lang.language} (${lang.proficiency})`).join(', ') || "",
      interests: data.interests?.join(', ') || ""
    };
  }, [data]);

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
      template1: <Template1 data={formattedData} fontSizeConfig={fontSizeConfig} />,
      template2: <Template2 data={formattedData} fontSizeConfig={fontSizeConfig} />,
      template3: <Template3 data={formattedData} fontSizeConfig={fontSizeConfig} />,
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

  return (
    <>
      <div className="flex-1 flex flex-col h-full bg-slate-100/50">
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
            
            {/* ATS Checker Button */}
            <button
              onClick={() => setShowATSModal(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Target size={16} />
              ATS Checker
            </button>
            
            {/* Mobile: Icon-only button */}
            <button
              onClick={() => setShowATSModal(true)}
              className="sm:hidden flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              aria-label="ATS Checker"
            >
              <Target size={16} />
            </button>
          </div>
        </header>

        {/* Main Preview Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 custom-scrollbar">
          <div className="mx-auto max-w-200">
            {/* Shadow & Paper Effect */}
            <div className="
              relative
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