import React, { useState } from "react";
import { useForm } from "../../context/formHooks.js";
import { actionTypes } from "../../constants/formConstants.js";

// Reusable Skill Pill Component
const SkillPill = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border bg-blue-50 text-blue-700 border-blue-100">
    {label}
    <button
      onClick={onRemove}
      className="hover:scale-125 transition-transform leading-none text-lg"
      title="Remove skill"
    >
      ×
    </button>
  </span>
);

export default function SkillsSection() {
  const { state, dispatch } = useForm();
  const [currentSkill, setCurrentSkill] = useState("");

  const addSkill = (skill) => {
    if (skill.trim()) {
      dispatch({
        type: actionTypes.ADD_TECHNICAL_SKILL,
        payload: skill.trim()
      });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill) => {
    // Try to remove from technical skills first
    if (state.technicalSkills.includes(skill)) {
      dispatch({ type: actionTypes.REMOVE_TECHNICAL_SKILL, payload: skill });
    }
    // Try to remove from non-technical skills
    else if (state.nonTechnicalSkills.includes(skill)) {
      dispatch({ type: actionTypes.REMOVE_NON_TECHNICAL_SKILL, payload: skill });
    }
  };

  // Combine all skills
  const allSkills = [...(state.technicalSkills || []), ...(state.nonTechnicalSkills || [])];

  return (
    <div className="mb-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Skills</h3>
          <p className="text-sm text-gray-500">Add your technical, professional, and soft skills.</p>
        </div>
        <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">04</span>
        </div>
      </div>

      {/* Skill Input */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            placeholder="e.g. React, Python, Leadership, Project Management, Communication"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill(currentSkill)}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
          <button
            onClick={() => addSkill(currentSkill)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-md shadow-blue-100 transition-all active:scale-95"
          >
            Add Skill
          </button>
        </div>
      </div>

      {/* Skills Display */}
      <div className="space-y-4">
        {allSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill, index) => (
              <SkillPill
                key={`${skill}-${index}`}
                label={skill}
                onRemove={() => removeSkill(skill)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No skills added yet. Start adding your skills above!</p>
        )}
      </div>

      {/* Skill Categories (Optional visual separation) */}
      {allSkills.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">All Skills</h4>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}