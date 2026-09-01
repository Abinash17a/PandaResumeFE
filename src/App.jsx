import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TemplateSelectionPage from "./pages/TemplateSelectionPage";
import ResumeEditorPage from "./pages/ResumeEditorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<TemplateSelectionPage />} />
        <Route path="/editor" element={<ResumeEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;