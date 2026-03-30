import React, { useState } from "react";
import { useForm } from "../../context/formHooks.js";
import { actionTypes } from "../../constants/formConstants.js";

// Consistent Label Component
const InputLabel = ({ children }) => (
  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
    {children}
  </label>
);

// Reusable Pill Component for skills, languages, interests
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

export default function AdditionalSections() {
  const { state, dispatch } = useForm();
  const [currentCertification, setCurrentCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: ""
  });
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    technologies: "",
    startDate: "",
    endDate: "",
    link: ""
  });
  const [currentAchievement, setCurrentAchievement] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState({
    language: "",
    proficiency: ""
  });
  const [currentInterest, setCurrentInterest] = useState("");

  // Certification handlers
  const addCertification = () => {
    if (currentCertification.name) {
      dispatch({
        type: actionTypes.ADD_CERTIFICATION,
        payload: {
          ...currentCertification,
          id: Date.now()
        }
      });
      setCurrentCertification({
        name: "",
        issuer: "",
        date: "",
        expiryDate: ""
      });
    }
  };

  const removeCertification = (id) => {
    dispatch({
      type: actionTypes.REMOVE_CERTIFICATION,
      payload: id
    });
  };

  // Project handlers
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

  // Achievement handlers
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

  // Language handlers
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

  // Interest handlers
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
    <div className="space-y-6">
      {/* Certifications Section */}
      <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
            <p className="text-sm text-gray-500">Professional certifications and credentials.</p>
          </div>
          <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center">
            <span className="text-orange-600 font-bold text-sm">06</span>
          </div>
        </div>
        
        <div className="mb-10 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <InputLabel>Certification Name</InputLabel>
              <input
                placeholder="e.g. AWS Certified Solutions Architect"
                value={currentCertification.name}
                onChange={(e) => setCurrentCertification({...currentCertification, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <InputLabel>Issuing Organization</InputLabel>
              <input
                placeholder="e.g. Amazon Web Services"
                value={currentCertification.issuer}
                onChange={(e) => setCurrentCertification({...currentCertification, issuer: e.target.value})}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <InputLabel>Date Obtained</InputLabel>
              <input
                type="date"
                value={currentCertification.date}
                onChange={(e) => setCurrentCertification({...currentCertification, date: e.target.value})}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <InputLabel>Expiry Date (Optional)</InputLabel>
              <input
                type="date"
                value={currentCertification.expiryDate}
                onChange={(e) => setCurrentCertification({...currentCertification, expiryDate: e.target.value})}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none"
              />
            </div>
          </div>
          <button
            onClick={addCertification}
            className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-orange-600 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            Add Certification
          </button>
        </div>
        
        <div className="space-y-4">
          {state.certifications?.map((cert) => (
            <div key={cert.id} className="group p-5 border border-gray-100 rounded-2xl bg-white hover:border-orange-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-orange-50 transition-colors">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{cert.name}</h4>
                    <p className="text-sm font-semibold text-orange-600">{cert.issuer}</p>
                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">
                      {cert.date}
                      {cert.expiryDate && ` — Expires: ${cert.expiryDate}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeCertification(cert.id)}
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

      {/* Projects Section */}
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
            <textarea
              placeholder="Describe your project and its impact..."
              value={currentProject.description}
              onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
              rows="4"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none resize-none"
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
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{proj.description}</p>
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

      {/* Achievements Section */}
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

      {/* Languages Section */}
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

      {/* Interests Section */}
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
    </div>
  );
}
