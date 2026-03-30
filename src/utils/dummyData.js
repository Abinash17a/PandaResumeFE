import { actionTypes } from "../constants/formConstants.js";

// Comprehensive dummy data for resume testing
export const dummyResumeData = {
  // Basic info
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  linkedin: "https://linkedin.com/in/johndoe",
  city: "San Francisco, CA",
  summary: "Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading development teams.",
  profileImage: "",
  
  // Experiences
  experiences: [
    {
      id: Date.now() + 1,
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01-01",
      endDate: "",
      current: true,
      description: "Lead development of enterprise web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines."
    },
    {
      id: Date.now() + 2,
      title: "Full Stack Developer",
      company: "Digital Innovations Ltd",
      location: "New York, NY",
      startDate: "2020-06-01",
      endDate: "2021-12-31",
      current: false,
      description: "Developed and maintained multiple client projects using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions."
    }
  ],
  
  // Education
  educationItems: [
    {
      id: Date.now() + 3,
      degreeType: "B.Tech",
      degree: "B.Tech in Computer Science",
      specialization: "Computer Science",
      school: "University of Technology",
      location: "Cambridge, MA",
      startDate: "2016-08-01",
      endDate: "2020-05-31",
      current: false,
      gpa: "3.8/4.0",
      notes: "Dean's List for 6 semesters, President of Coding Club"
    }
  ],
  
  // All Skills (unified)
  technicalSkills: [
    "JavaScript", "React", "Node.js", "Python", "TypeScript", "MongoDB", 
    "PostgreSQL", "Docker", "AWS", "Git", "REST APIs", "GraphQL",
    "Project Management", "Team Leadership", "Communication", "Problem Solving",
    "Agile Methodology", "Public Speaking", "Client Relations"
  ],
  
  nonTechnicalSkills: [],
  
  // Certifications
  certifications: [
    {
      id: Date.now() + 4,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-03-15",
      expiryDate: "2026-03-15"
    },
    {
      id: Date.now() + 5,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022-11-20",
      expiryDate: ""
    }
  ],
  
  // Projects
  projects: [
    {
      id: Date.now() + 6,
      title: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented user authentication, payment processing, and admin dashboard.",
      technologies: "React, Node.js, MongoDB, Stripe API, Redux",
      startDate: "2023-01-01",
      endDate: "2023-04-30",
      link: "https://github.com/johndoe/ecommerce-platform"
    },
    {
      id: Date.now() + 7,
      title: "Task Management App",
      description: "Developed a real-time task management application with drag-and-drop functionality, team collaboration features, and progress tracking.",
      technologies: "Vue.js, Express, Socket.io, PostgreSQL",
      startDate: "2022-09-01",
      endDate: "2022-12-15",
      link: "https://taskmanager-demo.com"
    }
  ],
  
  // Achievements
  achievements: [
    "Employee of the Year 2023 at Tech Solutions Inc.",
    "Led team to win Best Innovation Award 2022",
    "Published technical blog with 50K+ monthly readers",
    "Open source contributor with 1000+ GitHub stars"
  ],
  
  // Languages
  languages: [
    { id: Date.now() + 8, language: "English", proficiency: "Native" },
    { id: Date.now() + 9, language: "Spanish", proficiency: "Intermediate" },
    { id: Date.now() + 10, language: "French", proficiency: "Basic" }
  ],
  
  // Interests
  interests: [
    "Machine Learning", "Open Source Contribution", "Technical Writing",
    "Photography", "Hiking", "Chess", "Reading Tech Blogs"
  ]
};

/**
 * Populates the form with dummy data for development testing
 * @param {Function} dispatch - Redux/form dispatch function
 */
export const populateDummyData = (dispatch) => {
  // Dispatch all dummy data
  Object.keys(dummyResumeData).forEach(key => {
    if (key === 'name' || key === 'email' || key === 'phone' || key === 'linkedin' || key === 'summary' || key === 'profileImage') {
      dispatch({
        type: actionTypes.UPDATE_BASIC_INFO,
        payload: { [key]: dummyResumeData[key] }
      });
    } else if (Array.isArray(dummyResumeData[key])) {
      dummyResumeData[key].forEach(item => {
        if (key === 'experiences') {
          dispatch({ type: actionTypes.ADD_EXPERIENCE, payload: item });
        } else if (key === 'educationItems') {
          dispatch({ type: actionTypes.ADD_EDUCATION, payload: item });
        } else if (key === 'technicalSkills') {
          dispatch({ type: actionTypes.ADD_TECHNICAL_SKILL, payload: item });
        } else if (key === 'nonTechnicalSkills') {
          dispatch({ type: actionTypes.ADD_NON_TECHNICAL_SKILL, payload: item });
        } else if (key === 'certifications') {
          dispatch({ type: actionTypes.ADD_CERTIFICATION, payload: item });
        } else if (key === 'projects') {
          dispatch({ type: actionTypes.ADD_PROJECT, payload: item });
        } else if (key === 'achievements') {
          dispatch({ type: actionTypes.ADD_ACHIEVEMENT, payload: item });
        } else if (key === 'languages') {
          dispatch({ type: actionTypes.ADD_LANGUAGE, payload: item });
        } else if (key === 'interests') {
          dispatch({ type: actionTypes.ADD_INTEREST, payload: item });
        }
      });
    }
  });
};
