import React, { useState } from "react";
import { useForm } from "../../context/formHooks.js";
import { actionTypes } from "../../constants/formConstants.js";

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

export default function AchievementsSection() {
  const { state, dispatch } = useForm();
  const [currentAchievement, setCurrentAchievement] = useState("");

  const addAchievement = () => {
    if (currentAchievement.trim()) {
      dispatch({
        type: actionTypes.ADD_ACHIEVEMENT,
        payload: currentAchievement.trim()
      });
      setCurrentAchievement("");
    }
  };

  const removeAchievement = (achievement) => {
    dispatch({
      type: actionTypes.REMOVE_ACHIEVEMENT,
      payload: achievement
    });
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
          <p className="text-sm text-gray-500">Awards, honors, and notable accomplishments.</p>
        </div>
        <div className="h-10 w-10 bg-yellow-50 rounded-xl flex items-center justify-center">
          <span className="text-yellow-600 font-bold text-sm">08</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            placeholder="e.g. Employee of the Year, Best Paper Award"
            value={currentAchievement}
            onChange={(e) => setCurrentAchievement(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all"
          />
          <button
            onClick={addAchievement}
            className="px-6 py-2.5 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 font-bold text-sm shadow-md shadow-yellow-100 transition-all active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {state.achievements?.map((achievement, index) => (
          <SkillPill
            key={index}
            label={achievement}
            onRemove={() => removeAchievement(achievement)}
            colorClass="bg-yellow-50 text-yellow-700 border-yellow-100"
          />
        ))}
        {state.achievements?.length === 0 && (
          <p className="text-xs text-gray-400 italic">No achievements added yet.</p>
        )}
      </div>
    </div>
  );
}
