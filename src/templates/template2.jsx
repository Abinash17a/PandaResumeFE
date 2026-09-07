export default function Template1({ data = {}, fontSizeConfig = {}, spacingConfig = {}, previewId = "resume-preview" }) {
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
    if (Array.isArray(text)) {
      return text
        .map((value) => {
          if (typeof value === 'string') return value.trim();
          if (!value) return '';
          const label = value.name || value.language || value.label || value.title;
          const proficiency = value.proficiency ? ` (${value.proficiency})` : '';
          return label ? `${label}${proficiency}`.trim() : '';
        })
        .filter(Boolean);
    }
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
    if (Array.isArray(text)) {
      return text
        .map((achievement) => {
          if (typeof achievement === 'string') return achievement.trim();
          if (!achievement) return '';
          return String(achievement.text || achievement.description || achievement.title || '').trim();
        })
        .filter(Boolean);
    }
    if (!text) return [];
    return String(text)
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);
  }

  const formatProjects = (projects) => {
    if (Array.isArray(projects)) {
      return projects
        .filter((project) => project && (project.title || project.description || project.technologies || project.link))
        .map((project) => ({
          title: project.title || '',
          bullets: project.description ? [project.description] : [],
          technologies: project.technologies || '',
          link: project.link || '',
        }))
    }
    if (!projects) return []
    return String(projects)
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
  const certificationsList = Array.isArray(data.certifications)
    ? data.certifications.map((certification) => {
        if (typeof certification === "string") return certification.trim();
        if (!certification) return "";
        return [certification.name, certification.issuer, certification.date]
          .filter(Boolean)
          .join(" - ");
      }).filter(Boolean)
    : data.certifications ? String(data.certifications).split("\n").filter(Boolean) : [];
  const achievementsList = formatAchievements(data.achievements);
  const projectsList = formatProjects(data.projects);

  // Parse technical and non-technical skills separately
  const parseTechnicalSkills = (skills) => {
    if (!skills) return [];
    return parseList(skills);
  };

  const technicalSkillsList = [
    ...parseTechnicalSkills(data.technicalSkills),
    ...parseTechnicalSkills(data.nonTechnicalSkills),
    ...parseTechnicalSkills(data.skills),
  ];

  const containerStyle = {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "8px 18px 10px",
    backgroundColor: "#ffffff",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: "10px",
    lineHeight: 1.45,
    color: "#333",
    boxShadow: "none",
    borderRadius: "0"
  }

  const headerStyle = {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
    paddingBottom: "8px",
    marginBottom: "10px",
  }

  const headerLeftStyle = {
    flex: 1,
    textAlign: "left",
  }

  const headerRightStyle = {
    flexShrink: 0,
  }

  const profileImageStyle = {
    width: "96px",
    height: "96px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "2px solid #1a1a1a",
  }

  const nameStyle = {
    margin: 0,
    color: "#1a1a1a",
    fontSize: "22pt",
    letterSpacing: "0.5px",
    fontWeight: 700,
    marginBottom: "6px",
    lineHeight: 1.1
  }

  const contactStyle = {
    margin: "0",
    fontSize: "9pt",
    color: "#444",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
    flexWrap: "wrap",
    maxWidth: "100%"
  }

  const sectionHeaderStyle = {
    fontSize: "10pt",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#1a1a1a",
    marginTop: "4px",
    marginBottom: "6px",
    paddingBottom: "4px",
    borderBottom: "1px solid #1a1a1a",
  }

  const subsectionStyle = {
    marginBottom: "6px",
  }

  const jobTitleStyle = {
    fontSize: "10pt",
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: "2px",
  }

  const bulletListStyle = {
    margin: "2px 0 0 0",
    paddingLeft: "16px",
    fontSize: "9pt",
    lineHeight: 1.4,
  }

  const bulletItemStyle = {
    marginBottom: "1px",
  }

  const summaryStyle = {
    fontSize: "9pt",
    lineHeight: 1.4,
    color: "#333",
    textAlign: "left",
    marginBottom: "6px",
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

  // const mobileClampStyle = {
  //   display: "-webkit-box",
  //   WebkitLineClamp: 4,
  //   WebkitBoxOrient: "vertical",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  // }

  // const mobileProjectTitleStyle = {
  //   ...jobTitleStyle,
  //   display: "-webkit-box",
  //   WebkitLineClamp: 2,
  //   WebkitBoxOrient: "vertical",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  // }

  const linkedin = String(data.linkedin || '').replace(/\s+/g, '');
  const linkedinHref = linkedin && (/^https?:\/\//i.test(linkedin) ? linkedin : `https://${linkedin}`);

  return (
    <div
      id={previewId}
      role="document"
      style={containerStyle}
      className={`w-full max-w-4xl mx-auto px-6 py-4 ${lineHeight} ${letterSpacing} text-gray-800 print:max-w-none print:shadow-none print:rounded-none`}
    >
      {/* ATS-friendly hidden content */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
        <h1>{data.name || "CHARLES BLOOMBERG"}</h1>
        <h2>Professional Summary</h2>
        <p dangerouslySetInnerHTML={{ __html: data.summary }}></p>
        <h2>Work Experience</h2>
        {experienceList.map((exp, i) => (
          <div key={`ats-exp-${i}`}>
            <h3>{exp.title}</h3>
            <p>{exp.company}</p>
            <p>{exp.location}</p>
            <p>{exp.startDate} - {exp.endDate}</p>
            {exp.bullets && exp.bullets.map((bullet, j) => (
              <p key={`ats-exp-${i}-${j}`} dangerouslySetInnerHTML={{ __html: bullet }}></p>
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
              <p key={`ats-edu-${idx}-${j}`} dangerouslySetInnerHTML={{ __html: note }}></p>
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

      {/* Header with profile picture on right */}
      <header style={headerStyle} className={`${sectionMargin} ${sectionPadding} ${borderRadius}`}>
        {/* Hidden ATS-friendly contact info */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
          {data.city && <span>City: {data.city}</span>}
          {data.email && <span>Email: {data.email}</span>}
          {data.phone && <span>Phone: {data.phone}</span>}
          {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
        </div>
        
        <div style={headerLeftStyle}>
          <h1 className={`${heading} text-gray-900`} style={nameStyle}>{data.name || "CHARLES BLOOMBERG"}</h1>
          <div className={`${body} ${itemMargin} text-gray-700`} style={contactStyle}>
            {data.city && (
              <span style={{ marginRight: '8px', marginBottom: '2px' }}>
                {data.city}
              </span>
            )}
            {data.email && (
              <span style={{ marginRight: '8px', marginBottom: '2px' }}>
                {String(data.email).replace(/\s+/g, '')}
              </span>
            )}
            {data.phone && (
              <span style={{ marginRight: '8px', marginBottom: '2px' }}>
                {data.phone}
              </span>
            )}
            {data.linkedin && (
              <a href={linkedinHref} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {linkedin}
              </a>
            )}
          </div>
        </div>
        <div style={headerRightStyle}>
  <img
    src={
      data.profileImage ||
      `data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
        <circle cx='100' cy='100' r='100' fill='%23e5e7eb'/>
        <circle cx='100' cy='80' r='35' fill='%239ca3af'/>
        <path d='M40 165c10-35 35-50 60-50s50 15 60 50' fill='%239ca3af'/>
      </svg>`
    }
    alt="Profile"
    style={profileImageStyle}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src =
        "https://ui-avatars.com/api/?name=User&background=random&color=fff&size=200";
    }}
  />
</div>

      </header>

      {/* Summary */}
      {data.summary && (
        <section aria-label="Professional Summary" className={`${sectionMargin} ${sectionPadding} ${borderRadius} bg-white`}>
          <h2 className={`${subheading} text-gray-800 border-b border-gray-200 pb-1 mb-3`}>Professional Summary</h2>
          <div
            className={`${body} text-gray-700`}
            style={summaryStyle}
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </section>
      )}

      {/* Experience */}
      {experienceList.length > 0 && (
        <section aria-label="Work Experience" className={section}>
          <h2 className={subheading} style={sectionHeaderStyle}>WORK EXPERIENCE</h2>
          {experienceList.map((exp, i) => (
            <div key={`exp-${i}`} className={item} style={subsectionStyle}>
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
                    <li
                      key={`exp-${i}-${j}`}
                      style={bulletItemStyle}
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    >
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
        <section aria-label="projects">
          <h2 style={sectionHeaderStyle}>PROJECTS</h2>
          {projectsList.map((project, i) => (
            <div key={`project-${i}`} style={{ ...subsectionStyle, marginBottom: '10px' }}>
              <div style={jobTitleStyle}>{project.title}</div>
              {project.bullets.length > 0 && (
                <ul style={bulletListStyle}>
                  {project.bullets.map((bullet, j) => (
                    <li
                      key={`project-${i}-${j}`}
                      style={bulletItemStyle}
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    >
                    </li>
                  ))}
                </ul>
              )}
              {project.technologies && (
                <div style={{ fontSize: '9pt', marginTop: '2px' }}>
                  <strong>Technologies:</strong> {project.technologies}
                </div>
              )}
              {project.link && (
                <div style={{ fontSize: '9pt', marginTop: '2px' }}>
                  <strong>Link:</strong> {project.link}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {educationList.length > 0 && (
        <section aria-label="Education" className={section}>
          <h2 className={subheading} style={sectionHeaderStyle}>EDUCATION</h2>
          {educationList.map((edu, idx) => (
            <div key={`edu-${idx}`} className={item} style={subsectionStyle}>
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
                    <li key={`edu-${idx}-${j}`} style={bulletItemStyle} dangerouslySetInnerHTML={{ __html: note }}>
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
        <section aria-label="certifications">
          <h2 style={sectionHeaderStyle}>CERTIFICATIONS</h2>
          <ul style={bulletListStyle}>
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
        <section aria-label="achievements">
          <h2 style={sectionHeaderStyle}>Notable Achievements</h2>
          <ul style={bulletListStyle}>
            {achievementsList.map((achievement, i) => (
              <li key={`ach-${i}`} style={bulletItemStyle}>
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      <section aria-label="Skills">
        <h2 style={sectionHeaderStyle}>SKILLS</h2>
        
        {/* All Skills */}
        {technicalSkillsList.length > 0 && (
          <div style={skillsCategoryStyle}>
            <span style={skillsLabelStyle}>Technical Skills:</span>
            <span style={skillsValueStyle}>{technicalSkillsList.join(", ")}</span>
          </div>
        )}
        
        {/* Languages */}
        {languagesList.length > 0 && (
          <div style={skillsCategoryStyle}>
            <span style={skillsLabelStyle}>Languages:</span>
            <span style={skillsValueStyle}>{languagesList.join(", ")}</span>
          </div>
        )}
        
        {/* Interests */}
        {interestsList.length > 0 && (
          <div style={skillsCategoryStyle}>
            <span style={skillsLabelStyle}>Professional Interests:</span>
            <span style={skillsValueStyle}>{interestsList.join(", ")}</span>
          </div>
        )}
      </section>
    </div>
  )
}
