import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { useForm } from "../context/formHooks";
import { fontSizeConfig } from "../config/fontSizeConfig";

import DesktopLayout from "../components/layout/DesktopLayout";
import MobileLayout from "../components/layout/MobileLayout";

function ResumeEditorPage() {

  const { state: resumeData } = useForm();

  const [searchParams] = useSearchParams();

  const selectedTemplate =
    searchParams.get("template") || "template1";

  const [template] =
    useState(selectedTemplate);

  const [fontSize, setFontSize] =
    useState("medium");

  const activeFontConfig =
    fontSizeConfig[fontSize] || fontSizeConfig.medium;

  return (
    <div className="min-h-screen bg-slate-50">
      <main>

        <DesktopLayout
          resumeData={resumeData}
          template={template}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontSizeConfig={activeFontConfig}
        />

        <MobileLayout
          resumeData={resumeData}
          template={template}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontSizeConfig={activeFontConfig}
        />

      </main>

    </div>
  );
}

export default ResumeEditorPage;