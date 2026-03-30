import React from "react";
import { useForm } from "../../context/formHooks.js";
import RichTextEditor from "../RichTextEditor.jsx";
import { actionTypes } from "../../constants/formConstants.js";

// Reusable Input Component for consistency
const InputField = ({ label, name, type = "text", placeholder, value, onChange, icon }) => (
  <div className="relative">
    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white placeholder:text-gray-400 ${icon ? 'pl-10' : ''}`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default function BasicInfoSection({ template }) {
  const { state, dispatch } = useForm();

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: actionTypes.UPDATE_BASIC_INFO,
      payload: { [name]: value }
    });
  };

  const handleSummaryChange = (value) => {
    dispatch({
      type: actionTypes.UPDATE_BASIC_INFO,
      payload: { summary: value }
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: actionTypes.SET_PROFILE_IMAGE,
          payload: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-10 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
          <p className="text-sm text-gray-500">Provide your basic contact information.</p>
        </div>
        <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center">
          <span className="text-indigo-600 font-bold">01</span>
        </div>
      </div>
      
      {/* Profile Image Upload */}
      {template === "template2" && (
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Profile Picture</label>
          <div className="flex items-center gap-6">
            <div className="relative group">
              {state.profileImage ? (
                <>
                  <img 
                    src={state.profileImage} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-50 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => dispatch({ type: actionTypes.SET_PROFILE_IMAGE, payload: "" })}
                    className="absolute -top-2 -right-2 bg-white text-red-500 shadow-lg rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all border border-gray-100"
                  >
                    <span className="text-lg leading-none">×</span>
                  </button>
                </>
              ) : (
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <span className="text-2xl mb-1">📸</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Empty</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
                id="profileImageUpload"
              />
              <label
                htmlFor="profileImageUpload"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer text-sm font-semibold shadow-sm transition-all active:scale-95"
              >
                {state.profileImage ? "Update Photo" : "Upload Photo"}
              </label>
              <p className="text-xs text-gray-400 mt-2 italic leading-relaxed">
                Supported formats: JPG, PNG. <br/> Max size 5MB.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <InputField label="Full Name" name="name" placeholder="John Doe" value={state.name} onChange={handleBasicInfoChange} />
        <InputField label="City" name="city" placeholder="New York, NY" value={state.city} onChange={handleBasicInfoChange} />
        <InputField 
          label="Email Address" 
          name="email" 
          type="email" 
          placeholder="john@example.com" 
          value={state.email} 
          onChange={handleBasicInfoChange}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <InputField 
          label="Phone Number" 
          name="phone" 
          placeholder="(+1) 234 567 890" 
          value={state.phone} 
          onChange={handleBasicInfoChange}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />
        <InputField 
          label="LinkedIn URL" 
          name="linkedin" 
          type="url" 
          placeholder="linkedin.com/in/johndoe" 
          value={state.linkedin} 
          onChange={handleBasicInfoChange}
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          }
        />
      </div>

      <div className="mt-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">About Me</label>
        <RichTextEditor
          value={state.summary || ""}
          onChange={handleSummaryChange}
          placeholder="Briefly describe your career path and key strengths..."
          rows="4"
        />
      </div>
    </div>
  );
}