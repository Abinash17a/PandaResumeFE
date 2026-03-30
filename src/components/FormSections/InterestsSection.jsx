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

export default function InterestsSection() {
  const { state, dispatch } = useForm();
  const [currentInterest, setCurrentInterest] = useState("");

  const addInterest = () => {
    if (currentInterest.trim()) {
      dispatch({
        type: actionTypes.ADD_INTEREST,
        payload: currentInterest.trim()
      });
      setCurrentInterest("");
    }
  };

  const removeInterest = (interest) => {
    dispatch({
      type: actionTypes.REMOVE_INTEREST,
      payload: interest
    });
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Personal Interests & Hobbies</h3>
          <p className="text-sm text-gray-500">Show your personality and outside interests.</p>
        </div>
        <div className="h-10 w-10 bg-pink-50 rounded-xl flex items-center justify-center">
          <span className="text-pink-600 font-bold text-sm">10</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            placeholder="e.g. Photography, Hiking, Chess, Reading"
            value={currentInterest}
            onChange={(e) => setCurrentInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addInterest()}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all"
          />
          <button
            onClick={addInterest}
            className="px-6 py-2.5 bg-pink-600 text-white rounded-xl hover:bg-pink-700 font-bold text-sm shadow-md shadow-pink-100 transition-all active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {state.interests?.map((interest, index) => (
          <SkillPill
            key={index}
            label={interest}
            onRemove={() => removeInterest(interest)}
            colorClass="bg-pink-50 text-pink-700 border-pink-100"
          />
        ))}
        {state.interests?.length === 0 && (
          <p className="text-xs text-gray-400 italic">No interests added yet.</p>
        )}
      </div>
    </div>
  );
}
