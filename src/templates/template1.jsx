export default function Template1({ data = {}, fontSizeConfig = {}, spacingConfig = {} }) {
  console.log("sizing-----------",fontSizeConfig,"----------------------",spacingConfig)
  // Destructure with defaults - responsive sizing
  const {
    // Text sizes (responsive for mobile/tablet/web)
    heading = 'text-[18px] sm:text-[20px] lg:text-[22px] leading-tight font-bold',
    subheading = 'text-[14px] sm:text-[15px] lg:text-[16px] font-semibold',
    body = 'text-[10px] sm:text-[10.5px] lg:text-[11px] leading-snug',
    // Line heights
    lineHeight = 'leading-snug',
    // Letter spacing
    letterSpacing = 'tracking-normal',
    // Margins (responsive)
    sectionMargin = 'mb-2 sm:mb-3 lg:mb-3',
    itemMargin = 'mb-1 sm:mb-1.5 lg:mb-1.5',
    // Padding (responsive)
    sectionPadding = 'p-1.5 sm:p-2 lg:p-2',
    // Border radius
    borderRadius = 'rounded',
    // Section styles (responsive)
    section = 'mb-3 sm:mb-4 lg:mb-4',
    // Item styles (responsive)
    item = 'mb-1 sm:mb-1.5 lg:mb-1.5'
  } = { ...fontSizeConfig, ...spacingConfig };
  // helpers to parse fields gracefully
  const parseList = (text) => {
    if (!text) return []
    return String(text)
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
  }

  // Parse experience entries from array structure
  const parseExperience = (experiences) => {
    if (!experiences || !Array.isArray(experiences)) return [];
    
    return experiences.map(exp => ({
      title: exp.title || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      bullets: exp.description ? [exp.description] : []
    }));
  };

  // Parse education entries from array structure
  const parseEducation = (educationItems) => {
    if (!educationItems || !Array.isArray(educationItems)) return [];
    
    return educationItems.map(edu => ({
      degree: edu.degree || '',
      school: edu.school || '',
      location: edu.location || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      notes: edu.notes ? [edu.notes] : []
    }));
  };

  const formatAchievements = (text) => {
    if (!text) return []
    return text
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean)
  }

  const formatProjects = (text) => {
    if (!text) return []
    return text
      .split(/\n{2,}/)
      .map((block) => {
        const lines = block
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
        if (lines.length === 0) return null

        const title = lines[0].replace(/^[-*]\s*/, "")
        const bullets = lines
          .slice(1)
          .map((line) => line.replace(/^[-*]\s*/, ""))
          .filter((line) => line.trim().length > 0)

        return { title, bullets }
      })
      .filter(Boolean)
  }

  const languagesList = parseList(data.languages);
  const interestsList = parseList(data.interests);
  const experienceList = parseExperience(data.experiences);
  console.log("experience list",experienceList)
  const educationList = parseEducation(data.educationItems);
  const certificationsList = data.certifications ? data.certifications.split("\n").filter(Boolean) : [];
  const achievementsList = formatAchievements(data.achievements);
  const projectsList = formatProjects(data.projects || "");

  // Parse technical and non-technical skills separately
  const parseTechnicalSkills = (skills) => {
    if (!skills) return [];
    return parseList(skills);
  };

  const technicalSkillsList = parseTechnicalSkills(data.skills);

  const containerStyle = {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "16px 24px",
    backgroundColor: "#ffffff",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: "clamp(9px, 2.5vw, 11px)", // Responsive font size
    lineHeight: 1.5,
    color: "#333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px"
  }

  const headerStyle = {
    textAlign: "center",
    paddingBottom: "clamp(12px, 3vw, 16px)",
    marginBottom: "clamp(16px, 4vw, 20px)",
  }

  const nameStyle = {
    margin: 0,
    color: "#1a1a1a",
    fontSize: "clamp(18px, 5vw, 24pt)", // Responsive name size
    letterSpacing: "0.5px",
    fontWeight: 700,
    marginBottom: "6px",
    lineHeight: 1.1
  }

  const contactStyle = {
    margin: "0",
    fontSize: "clamp(8px, 2.5vw, 10pt)", // Responsive contact size
    color: "#444",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "clamp(4px, 1vw, 6px)",
    flexWrap: "wrap",
    maxWidth: "100%"
  }

  const sectionHeaderStyle = {
    fontSize: "clamp(9px, 3vw, 11pt)", // Responsive section headers
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#1a1a1a",
    marginTop: "clamp(8px, 2vw, 12px)",
    marginBottom: "clamp(4px, 1vw, 6px)",
    paddingBottom: "4px",
    borderBottom: "1px solid #1a1a1a",
  }

  const subsectionStyle = {
    marginBottom: "clamp(8px, 2vw, 12px)",
  }

  const jobTitleStyle = {
    fontSize: "clamp(9px, 3vw, 11pt)", // Responsive job titles
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: "2px",
  }

  const bulletListStyle = {
    margin: "4px 0 0 0",
    paddingLeft: "clamp(12px, 3vw, 16px)",
    fontSize: "clamp(8px, 2.5vw, 10pt)", // Responsive bullet text
    lineHeight: 1.5,
  }

  const bulletItemStyle = {
    marginBottom: "2px",
  }

  const summaryStyle = {
    fontSize: "clamp(8px, 2.5vw, 10pt)", // Responsive summary text
    lineHeight: 1.5,
    color: "#333",
    textAlign: "left",
    marginBottom: "8px",
    wordWrap: "break-word"
  }

  const skillsCategoryStyle = {
    marginBottom: "8px",
  }

  const skillsLabelStyle = {
    fontWeight: 700,
    display: "inline",
    marginRight: "6px",
  }

  const skillsValueStyle = {
    display: "inline",
  }

  return (
    <div
      id="resume-preview"
      role="document"
      style={containerStyle}
      className={`w-full max-w-[900px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 md:py-5 lg:py-6 ${lineHeight} ${letterSpacing} text-gray-800 print:px-6 print:py-4 print:max-w-none print:shadow-none print:rounded-none`}
    >
      {/* ATS-friendly hidden content */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
        <h1>{data.name || "CHARLES BLOOMBERG"}</h1>
        <h2>Professional Summary</h2>
        <p>{data.summary}</p>
        <h2>Work Experience</h2>
        {experienceList.map((exp, i) => (
          <div key={`ats-exp-${i}`}>
            <h3>{exp.title}</h3>
            <p>{exp.company}</p>
            <p>{exp.location}</p>
            <p>{exp.startDate} - {exp.endDate}</p>
            {exp.bullets && exp.bullets.map((bullet, j) => (
              <p key={`ats-exp-${i}-${j}`}>{bullet}</p>
            ))}
          </div>
        ))}
        <h2>Education</h2>
        {educationList.map((edu, idx) => (
          <div key={`ats-edu-${idx}`}>
            <h3>{edu.degree}</h3>
            <p>{edu.school}</p>
            <p>{edu.location}</p>
            <p>{edu.startDate} - {edu.endDate}</p>
            {edu.notes && edu.notes.map((note, j) => (
              <p key={`ats-edu-${idx}-${j}`}>{note}</p>
            ))}
          </div>
        ))}
        <h2>Skills</h2>
        <p>{technicalSkillsList.join(', ')}</p>
        <h2>Contact Information</h2>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>
        <p>LinkedIn: {data.linkedin}</p>
        <p>Location: {data.city}</p>
      </div>

      {/* Header */}
      <header style={headerStyle} className={`${sectionMargin} ${sectionPadding} ${borderRadius}`}>
        {/* Hidden ATS-friendly contact info */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
          {data.city && <span>City: {data.city}</span>}
          {data.email && <span>Email: {data.email}</span>}
          {data.phone && <span>Phone: {data.phone}</span>}
          {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
        </div>
        
        <h1 className={`${heading} text-gray-900`} style={nameStyle}>{data.name || "CHARLES BLOOMBERG"}</h1>
        <div className={`${body} ${itemMargin} text-gray-700`} style={contactStyle}>
          {data.city && (
            <span style={{ marginRight: '8px' }}>
              {data.city}
            </span>
          )}
          <span style={{ marginRight: '8px' }}>
            {data.email || "email@example.com"}
          </span>
          {(data.email || data.city) && data.phone && <span style={{ margin: '0 8px' }}>•</span>}
          <span style={{ marginRight: '8px' }}>
            {data.phone || "(123) 456-7890"}
          </span>
          {data.phone && data.linkedin && <span style={{ margin: '0 8px' }}>•</span>}
          {data.linkedin && (
            <span>
              {data.linkedin}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section aria-label="Professional Summary" className={`${sectionMargin} ${sectionPadding} ${borderRadius} bg-white break-inside-avoid-page`}>
          <h2 className={`${subheading} text-gray-800 border-b border-gray-200 pb-1 mb-3`}>PROFESSIONAL SUMMARY</h2>
          <div className={`${body} text-gray-700`} style={summaryStyle} dangerouslySetInnerHTML={{ __html: data.summary }} />
        </section>
      )}

      {/* Experience */}
      {experienceList.length > 0 && (
        <section aria-label="Work Experience" className={`${section} break-inside-avoid-page`}>
          <h2 className={subheading} style={sectionHeaderStyle}>WORK EXPERIENCE</h2>
          {experienceList.map((exp, i) => (
            <div key={`exp-${i}`} className={`${item} break-inside-avoid-page`} style={subsectionStyle}>
              <div style={{ marginBottom: '4px' }}>
                <h3 className={subheading} style={{ ...jobTitleStyle, display: 'inline', fontWeight: 700 }}>{exp.title}</h3>
                {exp.company && (
                  <span>
                    {' at '}
                    <span style={{ fontStyle: 'italic' }}>{exp.company}</span>
                  </span>
                )}
                {(exp.startDate || exp.endDate) && (
                  <span style={{ fontSize: '0.9em', color: '#666' }}>
                    {' • '}
                    {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : 
                     exp.startDate ? `${exp.startDate} - Present` : 
                     exp.endDate ? `Until ${exp.endDate}` : ''}
                  </span>
                )}
                {exp.location && (
                  <span style={{ fontSize: '0.9em', color: '#666' }}>
                    {' • '}{exp.location}
                  </span>
                )}
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul style={bulletListStyle}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={`exp-${i}-${j}`} style={bulletItemStyle}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projectsList.length > 0 && (
        <section aria-label="projects" className="break-inside-avoid-page">
          <h2 style={sectionHeaderStyle}>PROJECTS</h2>
          {projectsList.map((project, i) => (
            <div key={`project-${i}`} className="break-inside-avoid-page" style={subsectionStyle}>
              <div style={jobTitleStyle}>{project.title}</div>
              {project.bullets.length > 0 && (
                <ul style={bulletListStyle}>
                  {project.bullets.map((bullet, j) => (
                    <li key={`project-${i}-${j}`} style={bulletItemStyle}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {educationList.length > 0 && (
        <section aria-label="Education" className={`${section} break-inside-avoid-page`}>
          <h2 className={subheading} style={sectionHeaderStyle}>EDUCATION</h2>
          {educationList.map((edu, idx) => (
            <div key={`edu-${idx}`} className={`${item} break-inside-avoid-page`} style={subsectionStyle}>
              <div style={{ marginBottom: '4px' }}>
                <h3 className={subheading} style={{ ...jobTitleStyle, display: 'inline', fontWeight: 700 }}>{edu.degree}</h3>
                {edu.school && (
                  <span>
                    {', '}
                    <span style={{ fontStyle: 'italic' }}>{edu.school}</span>
                  </span>
                )}
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '0.9em', color: '#666' }}>
                    {' • '}
                    {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : 
                     edu.startDate ? `${edu.startDate} - Present` : 
                     edu.endDate ? `Until ${edu.endDate}` : ''}
                  </span>
                )}
                {edu.location && (
                  <span style={{ fontSize: '0.9em', color: '#666' }}>
                    {' • '}{edu.location}
                  </span>
                )}
              </div>
              {edu.notes && edu.notes.length > 0 && (
                <ul style={bulletListStyle}>
                  {edu.notes.map((note, j) => (
                    <li key={`edu-${idx}-${j}`} style={bulletItemStyle}>
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certificationsList.length > 0 && (
        <section aria-label="certifications" className="break-inside-avoid-page">
          <h2 style={sectionHeaderStyle}>CERTIFICATIONS</h2>
          <ul style={bulletListStyle} className="break-inside-avoid-page">
            {certificationsList.map((cert, i) => (
              <li key={`cert-${i}`} style={bulletItemStyle}>
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievementsList.length > 0 && (
        <section aria-label="achievements" className="break-inside-avoid-page">
          <h2 style={sectionHeaderStyle}>Notable Achievements</h2>
          <ul style={bulletListStyle} className="break-inside-avoid-page">
            {achievementsList.map((achievement, i) => (
              <li key={`ach-${i}`} style={bulletItemStyle}>
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      <section aria-label="Skills" className="break-inside-avoid-page">
        <h2 style={sectionHeaderStyle}>SKILLS</h2>
        
        {/* All Skills */}
        {technicalSkillsList.length > 0 && (
          <div style={skillsCategoryStyle} className="break-inside-avoid-page">
            <span style={skillsLabelStyle}>Technical Skills:</span>
            <span style={skillsValueStyle}>{technicalSkillsList.join(", ")}</span>
          </div>
        )}
        
        {/* Languages */}
        {languagesList.length > 0 && (
          <div style={skillsCategoryStyle} className="break-inside-avoid-page">
            <span style={skillsLabelStyle}>Languages:</span>
            <span style={skillsValueStyle}>{languagesList.join(", ")}</span>
          </div>
        )}
        
        {/* Interests */}
        {interestsList.length > 0 && (
          <div style={skillsCategoryStyle} className="break-inside-avoid-page">
            <span style={skillsLabelStyle}>Professional Interests:</span>
            <span style={skillsValueStyle}>{interestsList.join(", ")}</span>
          </div>
        )}
      </section>
    </div>
  )
}
