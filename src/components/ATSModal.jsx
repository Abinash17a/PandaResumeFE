import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, Target, AlertCircle, CheckCircle, Lightbulb, TrendingUp, BookOpen, Zap } from 'lucide-react';

export default function ATSModal({ isOpen, onClose, resumeText }) {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [rateLimit, setRateLimit] = useState({ remaining: 3, limit: 3, resetInHours: 24 });

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'technical skills': return <Zap size={16} />;
      case 'soft skills': return <BookOpen size={16} />;
      case 'overall match': return <TrendingUp size={16} />;
      case 'resume structure': return <FileText size={16} />;
      case 'content length': return <Target size={16} />;
      default: return <Lightbulb size={16} />;
    }
  };

  const handleCheck = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch("https://pandaresume.onrender.com/ats-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resumeText,
          jd: jobDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          // Rate limit exceeded - handle different types
          if (data.limitType === 'suspicious') {
            setError('🚫 Suspicious activity detected. Please wait before trying again.');
            return;
          } else if (data.limitType === 'global') {
            setError('⏰ Daily service limit reached. Please try again tomorrow.');
            return;
          } else {
            // IP or contact limit
            const resetTime = data.resetInHours || 24;
            setError(`📊 Rate limit exceeded. You can check again in ${resetTime} hour${resetTime > 1 ? 's' : ''}.`);
            return;
          }
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setResult(data);
      if (data.rateLimit) {
        setRateLimit(data.rateLimit);
      }
    } catch (err) {
      if (err.message.includes('429')) {
        setError('Rate limit exceeded. Please try again later.');
      } else {
        setError('Failed to check ATS compatibility. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-9999 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-semibold">ATS Compatibility Checker</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close ATS checker"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Job Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to check ATS compatibility..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Rate Limit Info */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target size={16} />
              <span>ATS Checks Remaining (24h)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${rateLimit.remaining <= 1 ? 'text-red-600' : rateLimit.remaining <= 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                {rateLimit.remaining}/{rateLimit.limit}
              </span>
              {rateLimit.remaining <= 2 && (
                <span className="text-xs text-gray-500">
                  ({rateLimit.resetInHours}h reset)
                </span>
              )}
            </div>
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheck}
            disabled={loading || !jobDescription.trim() || rateLimit.remaining <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Checking ATS Compatibility...
              </>
            ) : rateLimit.remaining <= 0 ? (
              <>
                <Target size={18} />
                Rate Limit Reached
              </>
            ) : (
              <>
                <FileText size={18} />
                Check ATS Score
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Score Display with Analysis */}
              <div className="text-center p-4 sm:p-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="text-3xl sm:text-5xl font-bold text-blue-600 mb-2">
                  {result.score || 'N/A'}%
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium mb-2 sm:mb-4">ATS Compatibility Score</div>
                
                {/* Analysis Metrics */}
                {result.analysis && (
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-semibold text-gray-700">{result.analysis.keyword_match_rate}%</div>
                      <div className="text-xs text-gray-500">Keyword Match</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-semibold text-gray-700">{result.analysis.semantic_similarity}%</div>
                      <div className="text-xs text-gray-500">Semantic Match</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-semibold text-gray-700">{result.analysis.total_resume_skills}</div>
                      <div className="text-xs text-gray-500">Resume Skills</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-semibold text-gray-700">{result.analysis.improvement_potential}%</div>
                      <div className="text-xs text-gray-500">Improvement Potential</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Improvement Suggestions */}
              {result.improvement_suggestions && result.improvement_suggestions.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                    <Lightbulb className="text-yellow-500" size={20} />
                    AI-Powered Improvement Suggestions
                  </h4>
                  
                  <div className="space-y-4">
                    {result.improvement_suggestions.map((suggestion, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(suggestion.priority)}`}>
                        {/* Suggestion Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded">
                              {getCategoryIcon(suggestion.category)}
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm">{suggestion.category}</h5>
                              <span className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                                suggestion.priority?.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                                suggestion.priority?.toLowerCase() === 'medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {suggestion.priority} Priority
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Main Suggestion */}
                        <p className="text-sm font-medium mb-3">{suggestion.suggestion}</p>

                        {/* Missing Items */}
                        {suggestion.missing_items && suggestion.missing_items.length > 0 && (
                          <div className="mb-3">
                            <div className="text-xs font-semibold mb-2 opacity-75">Missing Items:</div>
                            <div className="flex flex-wrap gap-1">
                              {suggestion.missing_items.map((item, itemIndex) => (
                                <span key={itemIndex} className="text-xs px-2 py-1 bg-white/50 rounded border">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actionable Steps */}
                        {suggestion.actionable_steps && suggestion.actionable_steps.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold mb-2 flex items-center gap-1">
                              <CheckCircle size={12} />
                              Actionable Steps:
                            </div>
                            <ul className="space-y-1">
                              {suggestion.actionable_steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="text-xs flex items-start gap-2">
                                  <span className="text-xs mt-0.5">•</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Overview */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Matched Skills */}
                {result.matched_skills && result.matched_skills.length > 0 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Matched Skills ({result.matched_skills.length})
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {result.matched_skills.map((skill, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {result.missing_skills && result.missing_skills.length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h5 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                      <AlertCircle size={16} />
                      Missing Skills ({result.missing_skills.length})
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {result.missing_skills.map((skill, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* General Feedback */}
              {result.feedback && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Feedback</h4>
                  <p className="text-blue-800 text-sm">{result.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
