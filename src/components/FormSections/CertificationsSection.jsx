import React, { useState } from "react";
import { useForm } from "../../context/formHooks.js";
import { actionTypes } from "../../constants/formConstants.js";

// Consistent Label Component
const InputLabel = ({ children }) => (
  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">
    {children}
  </label>
);

export default function CertificationsSection() {
  const { state, dispatch } = useForm();
  const [currentCertification, setCurrentCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: ""
  });

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

  return (
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
  );
}
