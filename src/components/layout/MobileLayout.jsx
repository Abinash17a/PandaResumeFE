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
    <div className="lg:hidden">

      {/* Form */}
      <div className="p-4">
        <StructuredFormNew template={template} />
      </div>

      {/* Preview Button */}
      <button
        onClick={() => setShowPreview(true)}
        className="
          fixed bottom-4 left-4
          bg-blue-600 hover:bg-blue-700
          text-white p-4
          rounded-full shadow-lg
          z-50
          inline-flex items-center justify-center
        "
        aria-label="Preview Resume"
        title="Preview Resume"
      >
        <Eye size={22} />
      </button>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="
            fixed inset-0
            bg-gray-900/50
            flex items-start justify-center
            z-50 p-4 overflow-y-auto
          "
          onClick={() => setShowPreview(false)}
        >
          <div
            className="
              bg-white rounded-lg
              w-full max-w-2xl
              my-8 relative
            "
            onClick={(e) => e.stopPropagation()}
          >

            <div className="
              sticky top-0
              bg-white p-4
              border-b
              flex justify-between items-center
              z-10
            ">
              <h3 className="text-lg font-semibold">
                Resume Preview
              </h3>

              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
              <div className="p-4">
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