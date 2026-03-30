// Form reducer function
export const formReducer = (state, action) => {
  switch (action.type) {
    // Basic info updates
    case 'UPDATE_BASIC_INFO':
      return {
        ...state,
        ...action.payload
      };

    case 'SET_PROFILE_IMAGE':
      return {
        ...state,
        profileImage: action.payload
      };

    // Experience management
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experiences: [...state.experiences, { ...action.payload, id: Date.now() }]
      };

    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.filter(exp => exp.id !== action.payload)
      };

    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        )
      };

    // Education management
    case 'ADD_EDUCATION':
      return {
        ...state,
        educationItems: [...state.educationItems, { ...action.payload, id: Date.now() }]
      };

    case 'REMOVE_EDUCATION':
      return {
        ...state,
        educationItems: state.educationItems.filter(edu => edu.id !== action.payload)
      };
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        educationItems: state.educationItems.map(edu =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        )
      };
    
    // Skills management
    case 'ADD_TECHNICAL_SKILL':
      return {
        ...state,
        technicalSkills: [...state.technicalSkills, action.payload]
      };
    
    case 'REMOVE_TECHNICAL_SKILL':
      return {
        ...state,
        technicalSkills: state.technicalSkills.filter(skill => skill !== action.payload)
      };
    
    case 'ADD_NON_TECHNICAL_SKILL':
      return {
        ...state,
        nonTechnicalSkills: [...state.nonTechnicalSkills, action.payload]
      };
    
    case 'REMOVE_NON_TECHNICAL_SKILL':
      return {
        ...state,
        nonTechnicalSkills: state.nonTechnicalSkills.filter(skill => skill !== action.payload)
      };
    
    // Certifications management
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [...state.certifications, { ...action.payload, id: Date.now() }]
      };
    
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter(cert => cert.id !== action.payload)
      };
    
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map(cert =>
          cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
        )
      };
    
    // Projects management
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, { ...action.payload, id: Date.now() }]
      };
    
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(proj => proj.id !== action.payload)
      };
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
        )
      };
    
    // Achievements management
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, action.payload]
      };
    
    case 'REMOVE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.filter(achievement => achievement !== action.payload)
      };
    
    // Languages management
    case 'ADD_LANGUAGE':
      return {
        ...state,
        languages: [...state.languages, { ...action.payload, id: Date.now() }]
      };
    
    case 'REMOVE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.filter(lang => lang.id !== action.payload)
      };
    
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map(lang =>
          lang.id === action.payload.id ? { ...lang, ...action.payload.data } : lang
        )
      };
    
    // Interests management
    case 'ADD_INTEREST':
      return {
        ...state,
        interests: [...state.interests, action.payload]
      };
    
    case 'REMOVE_INTEREST':
      return {
        ...state,
        interests: state.interests.filter(interest => interest !== action.payload)
      };
    
    // Reset form
    case 'RESET_FORM':
      return {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        summary: "",
        profileImage: "",
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
    
    default:
      return state;
  }
};
