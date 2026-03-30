// Action types for form reducer
export const actionTypes = {
  // Basic info
  UPDATE_BASIC_INFO: 'UPDATE_BASIC_INFO',
  SET_PROFILE_IMAGE: 'SET_PROFILE_IMAGE',

  // Experience
  ADD_EXPERIENCE: 'ADD_EXPERIENCE',
  REMOVE_EXPERIENCE: 'REMOVE_EXPERIENCE',
  UPDATE_EXPERIENCE: 'UPDATE_EXPERIENCE',

  // Education
  ADD_EDUCATION: 'ADD_EDUCATION',
  REMOVE_EDUCATION: 'REMOVE_EDUCATION',
  UPDATE_EDUCATION: 'UPDATE_EDUCATION',

  // Skills
  ADD_TECHNICAL_SKILL: 'ADD_TECHNICAL_SKILL',
  REMOVE_TECHNICAL_SKILL: 'REMOVE_TECHNICAL_SKILL',
  ADD_NON_TECHNICAL_SKILL: 'ADD_NON_TECHNICAL_SKILL',
  REMOVE_NON_TECHNICAL_SKILL: 'REMOVE_NON_TECHNICAL_SKILL',

  // Certifications
  ADD_CERTIFICATION: 'ADD_CERTIFICATION',
  REMOVE_CERTIFICATION: 'REMOVE_CERTIFICATION',
  UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',

  // Projects
  ADD_PROJECT: 'ADD_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',

  // Achievements
  ADD_ACHIEVEMENT: 'ADD_ACHIEVEMENT',
  REMOVE_ACHIEVEMENT: 'REMOVE_ACHIEVEMENT',

  // Languages
  ADD_LANGUAGE: 'ADD_LANGUAGE',
  REMOVE_LANGUAGE: 'REMOVE_LANGUAGE',
  UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',

  // Interests
  ADD_INTEREST: 'ADD_INTEREST',
  REMOVE_INTEREST: 'REMOVE_INTEREST',

  // Reset
  RESET_FORM: 'RESET_FORM'
};

// Initial state for form
export const initialState = {
  // Basic info
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  city: "",
  summary: "",
  profileImage: "",
  // Arrays for dynamic sections
  experiences: [],
  educationItems: [],
  technicalSkills: [],
  nonTechnicalSkills: [],
  certifications: [],
  projects: [],
  achievements: [],
  languages: [],
  interests: []
};
