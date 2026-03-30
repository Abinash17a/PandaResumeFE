import React, { useState } from "react";
import { useForm } from "../../context/formHooks.js";
import { actionTypes } from "../../constants/formConstants.js";
import RichTextEditor from "../RichTextEditor.jsx";

// Consistent Label Component
const InputLabel = ({ children }) => (
  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
    {children}
  </label>
);

export default function ProjectsSection() {
  const { state, dispatch } = useForm();
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    technologies: "",
    startDate: "",
    endDate: "",
    link: ""
  });

  const addProject = () => {
    if (currentProject.title && currentProject.description) {
      dispatch({
        type: actionTypes.ADD_PROJECT,
        payload: {
          ...currentProject,
          id: Date.now()
        }
      });
      setCurrentProject({
        title: "",
        description: "",
        technologies: "",
        startDate: "",
        endDate: "",
        link: ""
      });
    }
  };

  const removeProject = (id) => {
    dispatch({
      type: actionTypes.REMOVE_PROJECT,
      payload: id
    });
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">Showcase your portfolio and key projects.</p>
        </div>
        <div className="h-10 w-10 bg-purple-50 rounded-xl flex items-center justify-center">
          <span className="text-purple-600 font-bold text-sm">07</span>
        </div>
      </div>
      
      <div className="mb-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <InputLabel>Project Title</InputLabel>
            <input
              placeholder="e.g. E-commerce Platform"
              value={currentProject.title}
              onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none"
            />
          </div>
          <div>
            <InputLabel>Project Link (Optional)</InputLabel>
            <input
              placeholder="e.g. https://github.com/username/project"
              value={currentProject.link}
              onChange={(e) => setCurrentProject({...currentProject, link: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none"
            />
          </div>
          <div>
            <InputLabel>Start Date</InputLabel>
            <input
              type="date"
              value={currentProject.startDate}
              onChange={(e) => setCurrentProject({...currentProject, startDate: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none"
            />
          </div>
          <div>
            <InputLabel>End Date</InputLabel>
            <input
              type="date"
              value={currentProject.endDate}
              onChange={(e) => setCurrentProject({...currentProject, endDate: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <InputLabel>Project Description</InputLabel>
          <RichTextEditor
            value={currentProject.description}
            onChange={(value) => setCurrentProject({...currentProject, description: value})}
            placeholder="Describe your project and its impact..."
            rows="4"
          />
        </div>
        
        <div className="mb-6">
          <InputLabel>Technologies Used</InputLabel>
          <input
            placeholder="e.g. React, Node.js, MongoDB, AWS"
            value={currentProject.technologies}
            onChange={(e) => setCurrentProject({...currentProject, technologies: e.target.value})}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none"
          />
        </div>
        
        <button
          onClick={addProject}
          className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-purple-600 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          Add Project
        </button>
      </div>
      
      <div className="space-y-4">
        {state.projects?.map((proj) => (
          <div key={proj.id} className="group p-5 border border-gray-100 rounded-2xl bg-white hover:border-purple-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-purple-50 transition-colors">
                  🚀
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{proj.title}</h4>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">
                    {proj.startDate} — {proj.endDate}
                  </p>
                  {proj.description && (
                    <div className="text-sm text-gray-600 mt-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description }} />
                  )}
                  {proj.technologies && (
                    <p className="text-sm font-semibold text-purple-600 mt-2">
                      <strong>Technologies:</strong> {proj.technologies}
                    </p>
                  )}
                  {proj.link && (
                    <p className="text-sm text-blue-600 mt-2">
                      <strong>Link:</strong> <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{proj.link}</a>
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeProject(proj.id)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
