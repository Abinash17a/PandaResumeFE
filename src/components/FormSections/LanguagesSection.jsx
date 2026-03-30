import React, { useState } from "react";
import { useForm } from "../../context/formHooks.js";
import { actionTypes } from "../../constants/formConstants.js";

// Consistent Label Component
const InputLabel = ({ children }) => (
  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
    {children}
  </label>
);

// Reusable Pill Component
const SkillPill = ({ label, onRemove, colorClass }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border ${colorClass}`}>
    {label}
    <button
      onClick={onRemove}
      className="hover:scale-125 transition-transform leading-none text-lg"
      title="Remove"
    >
      ×
    </button>
  </span>
);

export default function LanguagesSection() {
  const { state, dispatch } = useForm();
  const [currentLanguage, setCurrentLanguage] = useState({
    language: "",
    proficiency: ""
  });

  const addLanguage = () => {
    if (currentLanguage.language && currentLanguage.proficiency) {
      dispatch({
        type: actionTypes.ADD_LANGUAGE,
        payload: {
          ...currentLanguage,
          id: Date.now()
        }
      });
      setCurrentLanguage({
        language: "",
        proficiency: ""
      });
    }
  };

  const removeLanguage = (id) => {
    dispatch({
      type: actionTypes.REMOVE_LANGUAGE,
      payload: id
    });
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Languages</h3>
          <p className="text-sm text-gray-500">Languages you speak and your proficiency level.</p>
        </div>
        <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center">
          <span className="text-teal-600 font-bold text-sm">09</span>
        </div>
      </div>
      
      <div className="mb-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <InputLabel>Language</InputLabel>
            <input
              placeholder="e.g. Spanish, Mandarin, French"
              value={currentLanguage.language}
              onChange={(e) => setCurrentLanguage({...currentLanguage, language: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 outline-none"
            />
          </div>
          <div>
            <InputLabel>Proficiency Level</InputLabel>
            <select
              value={currentLanguage.proficiency}
              onChange={(e) => setCurrentLanguage({...currentLanguage, proficiency: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 outline-none"
            >
              <option value="">Select Proficiency</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
          </div>
        </div>
        <button
          onClick={addLanguage}
          className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-teal-600 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          Add Language
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {state.languages?.map((lang) => (
          <SkillPill
            key={lang.id}
            label={`${lang.language} (${lang.proficiency})`}
            onRemove={() => removeLanguage(lang.id)}
            colorClass="bg-teal-50 text-teal-700 border-teal-100"
          />
        ))}
        {state.languages?.length === 0 && (
          <p className="text-xs text-gray-400 italic">No languages added yet.</p>
        )}
      </div>
    </div>
  );
}
