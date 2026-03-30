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

export default function ExperienceSection() {
  const { state, dispatch } = useForm();
  const [currentExperience, setCurrentExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: ""
  });

  const addExperience = () => {
    if (currentExperience.title && currentExperience.company) {
      dispatch({
        type: actionTypes.ADD_EXPERIENCE,
        payload: {
          ...currentExperience,
          id: Date.now() // Unique ID for keying
        }
      });
      setCurrentExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      });
    }
  };

  const removeExperience = (id) => {
    dispatch({
      type: actionTypes.REMOVE_EXPERIENCE,
      payload: id
    });
  };

  return (
    <div className="mb-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
          <p className="text-sm text-gray-500">Detail your professional journey and key impact.</p>
        </div>
        <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
          <span className="text-indigo-600 font-bold text-sm">03</span>
        </div>
      </div>

      {/* Add Experience Workspace */}
      <div className="mb-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <InputLabel>Job Title</InputLabel>
            <input
              placeholder="e.g. Senior Product Designer"
              value={currentExperience.title}
              onChange={(e) => setCurrentExperience({...currentExperience, title: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <InputLabel>Company</InputLabel>
            <input
              placeholder="e.g. Meta / Freelance"
              value={currentExperience.company}
              onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <InputLabel>Location</InputLabel>
            <input
              placeholder="e.g. San Francisco, CA / Remote"
              value={currentExperience.location}
              onChange={(e) => setCurrentExperience({...currentExperience, location: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <InputLabel>Start Date</InputLabel>
            <input
              type="date"
              value={currentExperience.startDate}
              onChange={(e) => setCurrentExperience({...currentExperience, startDate: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <InputLabel>End Date</InputLabel>
              <label className="flex items-center text-[10px] font-bold text-indigo-600 uppercase cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={currentExperience.current}
                  onChange={(e) => setCurrentExperience({...currentExperience, current: e.target.checked, endDate: ""})}
                  className="mr-1.5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                Present
              </label>
            </div>
            <input
              type="date"
              value={currentExperience.endDate}
              onChange={(e) => setCurrentExperience({...currentExperience, endDate: e.target.value})}
              disabled={currentExperience.current}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
            />
          </div>
        </div>

        <div className="mb-6">
          <InputLabel>Description & Achievements</InputLabel>
          <RichTextEditor
            value={currentExperience.description}
            onChange={(value) => setCurrentExperience({...currentExperience, description: value})}
            placeholder="Describe your role and quantify your impact (e.g., 'Led a team of 5 to increase revenue by 15%')"
            rows="4"
          />
        </div>

        <button
          onClick={addExperience}
          className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          Add Work Experience
        </button>
      </div>

      {/* Experience List - Saved Items */}
      <div className="space-y-4">
        {state.experiences?.map((exp) => (
          <div key={exp.id} className="group p-6 border border-gray-100 rounded-2xl bg-white hover:border-indigo-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-indigo-50 transition-colors">
                  💼
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{exp.title}</h4>
                  <p className="text-sm font-semibold text-indigo-600">{exp.company}</p>
                  {exp.location && (
                    <p className="text-sm text-gray-600 mt-1">{exp.location}</p>
                  )}
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <div className="text-sm text-gray-600 mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  )}
                </div>
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
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