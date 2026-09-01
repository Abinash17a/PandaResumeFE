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
    <div className="hidden lg:flex h-[calc(100vh-80px)]">

      {/* Form */}
      <div className="w-1/2 overflow-y-auto">
        <div className="p-4">
          <StructuredFormNew template={template} />
        </div>
      </div>

      {/* Preview */}
      <div className="w-1/2 overflow-y-auto bg-gray-50">
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
  );
}

export default DesktopLayout;