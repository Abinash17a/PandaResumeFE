'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const colorMap = {
  indigo: { bg: 'from-indigo-600 to-indigo-700', accent: 'bg-indigo-100', dot: 'bg-indigo-600' },
  teal: { bg: 'from-teal-600 to-teal-700', accent: 'bg-teal-100', dot: 'bg-teal-600' },
  rose: { bg: 'from-rose-600 to-rose-700', accent: 'bg-rose-100', dot: 'bg-rose-600' }
};

export default function TemplateSelector({ setTemplate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const templates = [
    { id: 'template1', name: 'Classic', description: 'Clean, structured layout perfect for traditional roles', color: 'indigo' },
    { id: 'template2', name: 'Modern', description: 'Contemporary design with bold typography', color: 'teal' },
    { id: 'template3', name: 'Minimal', description: 'Sleek and elegant with minimal aesthetics', color: 'rose' }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedId(templateId);
    setTemplate(templateId);
    setTimeout(() => setIsOpen(false), 400);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full font-medium text-sm hover:shadow-lg hover:from-slate-800 hover:to-slate-700 transition-all duration-300 hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375H12a1.125 1.125 0 01-1.125-1.125V10.5m6 4.5v7.5m-3-7.5h3m-9 8.25h10.5a2.25 2.25 0 002.25-2.25v-1.058a9.75 9.75 0 00-7.754-9.608A3.375 3.375 0 009.75 3.75H8.25v1.5m7.5 0v7.5m-9-7.5h3V18a1.125 1.125 0 001.125 1.125h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Choose Template</span>
      </button>

      {/* Modal with Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="relative px-8 py-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Select Your Template</h2>
              <p className="text-sm text-slate-500 mt-1">Choose a design that matches your style</p>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Templates Grid */}
            <div className="p-8 space-y-3">
              {templates.map((template) => {
                const colors = colorMap[template.color];
                const isSelected = selectedId === template.id;

                return (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-full group relative overflow-hidden rounded-xl border-2 border-slate-100 hover:border-slate-300 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:bg-slate-50"
                  >
                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-start justify-between gap-4">
                      {/* Content */}
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-slate-900 group-hover:text-slate-950 transition-colors text-lg">
                          {template.name}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1 group-hover:text-slate-600 transition-colors">
                          {template.description}
                        </p>
                      </div>

                      {/* Color Badge */}
                      <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg ${colors.accent} group-hover:scale-110 transition-transform duration-300`}>
                        {isSelected ? (
                          <CheckCircle2 className={`w-6 h-6 ${colors.dot}`} />
                        ) : (
                          <div className={`w-3 h-3 rounded-full ${colors.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />
                        )}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bg}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
