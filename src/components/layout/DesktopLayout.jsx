import StructuredFormNew from "../StructuredFormNew";
import Preview from "../Preview";

function DesktopLayout({
  resumeData,
  template,
  fontSize,
  setFontSize,
  fontSizeConfig
}) {
  return (
    <div className="hidden xl:flex h-[calc(100vh-80px)] print:block print:h-auto">

      {/* Form */}
      <div className="w-1/2 overflow-y-auto print:hidden">
        <div className="p-4">
          <StructuredFormNew template={template} />
        </div>
      </div>

      {/* Preview */}
      <div className="w-1/2 overflow-y-auto bg-gray-50 print:block print:w-full print:overflow-visible print:bg-white">
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
  );
}

export default DesktopLayout;