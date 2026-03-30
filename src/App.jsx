import { useState } from "react";
import StructuredForm from "./components/StructuredFormNew";
import Preview from "./components/Preview";
import TemplateSelector from "./components/TemplateSelector";
import { useForm } from "./context/formHooks.js";

function App() {
  const { state: resumeData } = useForm();

  const [template, setTemplate] = useState("template1");
  const [fontSize, setFontSize] = useState("medium");
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const fontSizeConfig = {
    small: {
      heading: "text-xl font-bold",
      subheading: "text-base font-semibold",
      body: "text-sm",
      small: "text-xs",
      lineHeight: "leading-snug",
      letterSpacing: "tracking-normal",
      sectionMargin: "mb-3",
      itemMargin: "mb-1.5",
      sectionPadding: "p-2",
      borderRadius: "rounded"
    },
    medium: {
      heading: "text-2xl font-bold",
      subheading: "text-lg font-semibold",
      body: "text-base",
      small: "text-sm",
      lineHeight: "leading-normal",
      letterSpacing: "tracking-normal",
      sectionMargin: "mb-4",
      itemMargin: "mb-2",
      sectionPadding: "p-3",
      borderRadius: "rounded-md"
    },
    large: {
      heading: "text-3xl font-bold",
      subheading: "text-xl font-semibold",
      body: "text-lg",
      small: "text-base",
      lineHeight: "leading-relaxed",
      letterSpacing: "tracking-wide",
      sectionMargin: "mb-6",
      itemMargin: "mb-3",
      sectionPadding: "p-4",
      borderRadius: "rounded-lg"
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <TemplateSelector setTemplate={setTemplate} />
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="flex-1">
        {/* Desktop/Tablet: Split Screen */}
        <div className="hidden lg:flex h-[calc(100vh-80px)]">
          {/* Form - Scrollable */}
          <div className="w-1/2 overflow-y-auto">
            <div className="p-4">
              <StructuredForm template={template} />
            </div>
          </div>

          {/* Preview - Fixed */}
          <div className="w-1/2 overflow-y-auto bg-gray-50">
            <div className="p-4">
              <Preview
                data={resumeData}
                template={template}
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontSizeConfig={fontSizeConfig[fontSize]}
              />
            </div>
          </div>
        </div>

        {/* Mobile: Stacked Layout with Preview Button */}
        <div className="lg:hidden">
          <div className="p-4">
            <StructuredForm template={template} />
          </div>

          {/* Preview Button - Only shown on mobile */}
          <button
            onClick={() => setShowMobilePreview(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg lg:hidden z-50"
            aria-label="Preview Resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Mobile Preview Modal */}
          {showMobilePreview && (
            <div className="fixed inset-0 bg-gray-900/50 flex items-start justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowMobilePreview(false)}>
              <div className="bg-white rounded-lg w-full max-w-2xl my-8 relative" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
                  <h3 className="text-lg font-semibold">Resume Preview</h3>
                  <button
                    onClick={() => setShowMobilePreview(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close preview"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
                  <div className="p-4">
                    <Preview
                      data={resumeData}
                      template={template}
                      fontSize={fontSize}
                      setFontSize={setFontSize}
                      fontSizeConfig={fontSizeConfig[fontSize]}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hidden preview for initial render */}
          <div className="hidden">
            <Preview
              data={resumeData}
              template={template}
              fontSize={fontSize}
              setFontSize={setFontSize}
              fontSizeConfig={fontSizeConfig[fontSize]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
