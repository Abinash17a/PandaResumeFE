import { useState } from "react";
import { Eye } from "lucide-react";
import StructuredFormNew from "../StructuredFormNew";
import Preview from "../Preview";

function MobileLayout({
  resumeData,
  template,
  fontSize,
  setFontSize,
  fontSizeConfig
}) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="xl:hidden">

      {/* Form */}
      <div className="p-4 print:hidden">
        <StructuredFormNew
          template={template}
          onBeforePrint={() => setShowPreview(true)}
          onBeforeDownload={() => setShowPreview(true)}
        />
      </div>

      <button
        type="button"
        onClick={() => setShowPreview(true)}
        className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 sm:bottom-20 print:hidden"
        aria-label="View resume preview"
      >
        <Eye size={20} />
        Preview
      </button>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-900/50 p-4 print:static print:block print:bg-white print:p-0"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="my-8 w-full max-w-2xl rounded-lg bg-white print:my-0 print:max-w-none print:rounded-none"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4 print:hidden">
              <h3 className="text-lg font-semibold">Resume Preview</h3>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="text-2xl leading-none text-gray-500 hover:text-gray-700"
                aria-label="Close resume preview"
              >
                ×
              </button>
            </div>

            <div className="max-h-[calc(100vh-10rem)] overflow-y-auto print:max-h-none print:overflow-visible">
              <div className="p-4 print:p-0">
                <Preview
                  data={resumeData}
                  template={template}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  fontSizeConfig={fontSizeConfig}
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MobileLayout;