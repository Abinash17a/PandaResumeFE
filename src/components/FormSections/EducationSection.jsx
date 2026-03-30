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

export default function EducationSection() {
  const { state, dispatch } = useForm();
  const [currentEducation, setCurrentEducation] = useState({
    degreeType: "",
    degree: "",
    specialization: "",
    school: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    gpa: "",
    notes: ""
  });

  const addEducation = () => {
    let degreeValue = currentEducation.degreeType === 'Other' 
      ? currentEducation.degree 
      : currentEducation.degreeType;
    
    if (currentEducation.specialization && currentEducation.degreeType !== 'Other') {
      degreeValue += ` in ${currentEducation.specialization}`;
    }
    
    if (degreeValue && currentEducation.school) {
      dispatch({
        type: actionTypes.ADD_EDUCATION,
        payload: {
          ...currentEducation,
          id: Date.now(), // Ensure unique ID for list rendering
          degree: degreeValue
        }
      });
      setCurrentEducation({
        degreeType: "", degree: "", specialization: "", school: "",
        location: "", startDate: "", endDate: "", current: false, gpa: "", notes: ""
      });
    }
  };

  const removeEducation = (id) => {
    dispatch({ type: actionTypes.REMOVE_EDUCATION, payload: id });
  };

  return (
    <div className="mb-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Education</h3>
          <p className="text-sm text-gray-500">Add your academic qualifications and achievements.</p>
        </div>
        <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
          <span className="text-indigo-600 font-bold text-sm">02</span>
        </div>
      </div>
      
      {/* Entry Form - Nested in a subtle "workspace" box */}
      <div className="mb-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <InputLabel>Degree Type</InputLabel>
            <select
              value={currentEducation.degreeType || ''}
              onChange={(e) => setCurrentEducation({
                ...currentEducation,
                degreeType: e.target.value,
                degree: e.target.value === 'Other' ? currentEducation.degree : ''
              })}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            >
              <option value="">Select Degree</option>
              <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
              <option value="B.Sc">B.Sc (Bachelor of Science)</option>
              <option value="BCA">BCA (Bachelor of Computer Applications)</option>
              <option value="M.Tech">M.Tech (Master of Technology)</option>
              <option value="PhD">PhD (Doctor of Philosophy)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <InputLabel>School / University</InputLabel>
            <input
              placeholder="e.g. Harvard University"
              value={currentEducation.school}
              onChange={(e) => setCurrentEducation({...currentEducation, school: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <InputLabel>Location</InputLabel>
            <input
              placeholder="e.g. Cambridge, MA / Online"
              value={currentEducation.location}
              onChange={(e) => setCurrentEducation({...currentEducation, location: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Conditional inputs based on selection */}
          {currentEducation.degreeType && (
            <div className="md:col-span-2">
              <InputLabel>{currentEducation.degreeType === 'Other' ? 'Custom Degree' : 'Specialization'}</InputLabel>
              <input
                type="text"
                placeholder={currentEducation.degreeType === 'Other' ? "Enter your degree title" : "e.g. Computer Science"}
                value={currentEducation.degreeType === 'Other' ? currentEducation.degree : currentEducation.specialization}
                onChange={(e) => {
                  const val = e.target.value;
                  currentEducation.degreeType === 'Other' 
                    ? setCurrentEducation({...currentEducation, degree: val})
                    : setCurrentEducation({...currentEducation, specialization: val})
                }}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
              />
            </div>
          )}

          <div>
            <InputLabel>Start Date</InputLabel>
            <input
              type="date"
              value={currentEducation.startDate}
              onChange={(e) => setCurrentEducation({...currentEducation, startDate: e.target.value})}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <InputLabel>End Date</InputLabel>
              <label className="flex items-center text-[10px] font-bold text-indigo-600 uppercase cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={currentEducation.current}
                  onChange={(e) => setCurrentEducation({...currentEducation, current: e.target.checked, endDate: ""})}
                  className="mr-1.5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                Present
              </label>
            </div>
            <input
              type="date"
              value={currentEducation.endDate}
              onChange={(e) => setCurrentEducation({...currentEducation, endDate: e.target.value})}
              disabled={currentEducation.current}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <InputLabel>GPA (Optional)</InputLabel>
            <input
              placeholder="e.g. 3.9 / 4.0"
              value={currentEducation.gpa}
              onChange={(e) => setCurrentEducation({...currentEducation, gpa: e.target.value})}
              className="w-full md:w-1/3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <InputLabel>Additional Notes</InputLabel>
          <RichTextEditor
            value={currentEducation.notes}
            onChange={(value) => setCurrentEducation({...currentEducation, notes: value})}
            placeholder="Honors, awards, or specific coursework..."
            rows="3"
          />
        </div>

        <button
          onClick={addEducation}
          className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          Add Education Entry
        </button>
      </div>

      {/* Saved Education Items List */}
      <div className="space-y-4">
        {state.educationItems?.map((edu) => (
          <div key={edu.id} className="group p-5 border border-gray-100 rounded-2xl bg-white hover:border-indigo-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-indigo-50 transition-colors">
                  🎓
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-sm font-semibold text-indigo-600">{edu.school}</p>
                  {edu.location && (
                    <p className="text-sm text-gray-600 mt-1">{edu.location}</p>
                  )}
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">
                    {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                  </p>
                  {edu.gpa && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-md uppercase">
                      GPA: {edu.gpa}
                    </span>
                  )}
                  {edu.notes && <div className="text-sm text-gray-600 mt-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: edu.notes }} />}
                </div>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
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
