export default function Template2({ data = {}, fontSizeConfig = {}, spacingConfig = {}, previewId = "resume-preview" }) {
  const {
    heading = 'text-[18px] sm:text-[20px] lg:text-[22px] leading-tight font-bold',
    subheading = 'text-[13px] sm:text-[14px] lg:text-[15px] font-semibold',
    body = 'text-[10px] sm:text-[10.5px] lg:text-[11px] leading-snug',
    lineHeight = 'leading-snug',
    letterSpacing = 'tracking-normal',
  } = { ...fontSizeConfig, ...spacingConfig };

  // --- helpers (same parsing contract as Template1) ---
  const parseList = (text) => {
    if (!text) return [];
    return String(text)
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const parseExperience = (experiences) => {
    if (!experiences || !Array.isArray(experiences)) return [];
    return experiences.map((exp) => ({
      title: exp.title || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      bullets: exp.description ? [exp.description] : [],
    }));
  };

  const parseEducation = (educationItems) => {
    if (!educationItems || !Array.isArray(educationItems)) return [];
    return educationItems.map((edu) => ({
      degree: edu.degree || '',
      school: edu.school || '',
      location: edu.location || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      notes: edu.notes ? [edu.notes] : [],
    }));
  };

  const formatAchievements = (text) => {
    if (!text) return [];
    return text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  };

  const formatProjects = (text) => {
    if (!text) return [];
    return text
      .split(/\n{2,}/)
      .map((block) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.length === 0) return null;
        const title = lines[0].replace(/^[-*]\s*/, '');
        const bullets = lines.slice(1).map((l) => l.replace(/^[-*]\s*/, '')).filter(Boolean);
        return { title, bullets };
      })
      .filter(Boolean);
  };

  const languagesList = parseList(data.languages);
  const interestsList = parseList(data.interests);
  const experienceList = parseExperience(data.experiences);
  const educationList = parseEducation(data.educationItems);
  const certificationsList = data.certifications ? data.certifications.split('\n').filter(Boolean) : [];
  const achievementsList = formatAchievements(data.achievements);
  const projectsList = formatProjects(data.projects || '');
  const technicalSkillsList = parseList(data.skills);

  const ACCENT = '#3E6E8E';
  const SIDEBAR_BG = '#1B2A3D';
  const SIDEBAR_MUTED = '#9AB0C4';

  const containerStyle = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 'clamp(9px, 2.5vw, 11px)',
    lineHeight: 1.5,
    color: '#2A2E35',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const sidebarSectionTitle = {
    fontSize: 'clamp(9px, 2.6vw, 10.5pt)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#FFFFFF',
    marginBottom: '6px',
    paddingBottom: '4px',
    borderBottom: `1px solid ${ACCENT}`,
  };

  const mainSectionTitle = {
    fontSize: 'clamp(9px, 3vw, 11pt)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#1a1a1a',
    marginTop: 'clamp(8px, 2vw, 12px)',
    marginBottom: 'clamp(4px, 1vw, 6px)',
    paddingBottom: '4px',
    borderBottom: `2px solid ${ACCENT}`,
  };

  const jobTitleStyle = {
    fontSize: 'clamp(9px, 3vw, 11pt)',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '2px',
  };

  const bulletListStyle = {
    margin: '4px 0 0 0',
    paddingLeft: 'clamp(12px, 3vw, 16px)',
    fontSize: 'clamp(8px, 2.5vw, 10pt)',
    lineHeight: 1.5,
  };

  const bulletItemStyle = { marginBottom: '2px' };

  const mobileClampStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const mobileProjectTitleStyle = {
    ...jobTitleStyle,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const subsectionStyle = { marginBottom: 'clamp(8px, 2vw, 12px)' };

  return (
    <div
      id={previewId}
      role="document"
      style={containerStyle}
      className={`w-full max-w-4xl mx-auto ${lineHeight} ${letterSpacing} text-gray-800 print:shadow-none print:rounded-none print:max-w-none`}
    >
      {/* ATS-friendly hidden content */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
        <h1>{data.name || 'CHARLES BLOOMBERG'}</h1>
        <h2>Professional Summary</h2>
        <p dangerouslySetInnerHTML={{ __html: data.summary }}></p>
        <h2>Work Experience</h2>
        {experienceList.map((exp, i) => (
          <div key={`ats-exp-${i}`}>
            <h3>{exp.title}</h3>
            <p>{exp.company}</p>
            <p>{exp.location}</p>
            <p>{exp.startDate} - {exp.endDate}</p>
            {exp.bullets.map((bullet, j) => (
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
            {edu.notes.map((note, j) => (
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

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside
          style={{ backgroundColor: SIDEBAR_BG }}
          className="w-full sm:w-[34%] px-5 py-6 sm:px-6 sm:py-8 flex-shrink-0"
        >
          <h1 className={`${heading} text-white`} style={{ lineHeight: 1.15 }}>
            {data.name || 'Charles Bloomberg'}
          </h1>

          {/* Contact */}
          <div className={`${body} mt-4 space-y-1.5`} style={{ color: SIDEBAR_MUTED }}>
            {data.email && <div className="break-words">{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.city && <div>{data.city}</div>}
            {data.linkedin && <div className="break-words">{data.linkedin}</div>}
          </div>

          {/* Skills */}
          {technicalSkillsList.length > 0 && (
            <div className="mt-6">
              <div style={sidebarSectionTitle}>Skills</div>
              <ul className={`${body} space-y-1`} style={{ color: '#E4EAF0' }}>
                {technicalSkillsList.map((skill, i) => (
                  <li key={`skill-${i}`}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languagesList.length > 0 && (
            <div className="mt-6">
              <div style={sidebarSectionTitle}>Languages</div>
              <ul className={`${body} space-y-1`} style={{ color: '#E4EAF0' }}>
                {languagesList.map((lang, i) => (
                  <li key={`lang-${i}`}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests */}
          {interestsList.length > 0 && (
            <div className="mt-6">
              <div style={sidebarSectionTitle}>Interests</div>
              <ul className={`${body} space-y-1`} style={{ color: '#E4EAF0' }}>
                {interestsList.map((interest, i) => (
                  <li key={`interest-${i}`}>{interest}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certificationsList.length > 0 && (
            <div className="mt-6">
              <div style={sidebarSectionTitle}>Certifications</div>
              <ul className={`${body} space-y-1`} style={{ color: '#E4EAF0' }}>
                {certificationsList.map((cert, i) => (
                  <li key={`cert-${i}`}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 px-5 py-6 sm:px-7 sm:py-8">
          {/* Summary */}
          {data.summary && (
            <section aria-label="Professional Summary" className="break-inside-avoid-page">
              <h2 style={mainSectionTitle}>Summary</h2>
              <div
                className={`${body} text-gray-700`}
                style={{ marginBottom: '8px' }}
                dangerouslySetInnerHTML={{ __html: data.summary }}
              />
            </section>
          )}

          {/* Experience */}
          {experienceList.length > 0 && (
            <section aria-label="Work Experience" className="break-inside-avoid-page">
              <h2 style={mainSectionTitle}>Experience</h2>
              {experienceList.map((exp, i) => (
                <div key={`exp-${i}`} className="break-inside-avoid-page" style={subsectionStyle}>
                  <div style={{ marginBottom: '4px' }}>
                    <h3 className={subheading} style={{ ...jobTitleStyle, display: 'inline' }}>
                      {exp.title}
                    </h3>
                    {exp.company && (
                      <span>
                        {' — '}
                        <span style={{ fontStyle: 'italic' }}>{exp.company}</span>
                      </span>
                    )}
                  </div>
                  {(exp.startDate || exp.endDate || exp.location) && (
                    <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '4px' }}>
                      {exp.startDate && exp.endDate
                        ? `${exp.startDate} - ${exp.endDate}`
                        : exp.startDate
                        ? `${exp.startDate} - Present`
                        : exp.endDate
                        ? `Until ${exp.endDate}`
                        : ''}
                      {exp.location && ` • ${exp.location}`}
                    </div>
                  )}
                  {exp.bullets.length > 0 && (
                    <ul style={bulletListStyle}>
                      {exp.bullets.map((bullet, j) => (
                        <li key={`exp-${i}-${j}`} style={bulletItemStyle} dangerouslySetInnerHTML={{ __html: bullet }} />
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
              <h2 style={mainSectionTitle}>Projects</h2>
              {projectsList.map((project, i) => (
                <div key={`project-${i}`} className="break-inside-avoid-page" style={subsectionStyle}>
                  <div style={jobTitleStyle}>{project.title}</div>
                  {project.bullets.length > 0 && (
                    <ul style={bulletListStyle}>
                      {project.bullets.map((bullet, j) => (
                        <li key={`project-${i}-${j}`} style={bulletItemStyle} dangerouslySetInnerHTML={{ __html: bullet }} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {educationList.length > 0 && (
            <section aria-label="Education" className="break-inside-avoid-page">
              <h2 style={mainSectionTitle}>Education</h2>
              {educationList.map((edu, idx) => (
                <div key={`edu-${idx}`} className="break-inside-avoid-page" style={subsectionStyle}>
                  <div style={{ marginBottom: '4px' }}>
                    <h3 className={subheading} style={{ ...jobTitleStyle, display: 'inline' }}>
                      {edu.degree}
                    </h3>
                    {edu.school && (
                      <span>
                        {', '}
                        <span style={{ fontStyle: 'italic' }}>{edu.school}</span>
                      </span>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate || edu.location) && (
                    <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '4px' }}>
                      {edu.startDate && edu.endDate
                        ? `${edu.startDate} - ${edu.endDate}`
                        : edu.startDate
                        ? `${edu.startDate} - Present`
                        : edu.endDate
                        ? `Until ${edu.endDate}`
                        : ''}
                      {edu.location && ` • ${edu.location}`}
                    </div>
                  )}
                  {edu.notes.length > 0 && (
                    <ul style={bulletListStyle}>
                      {edu.notes.map((note, j) => (
                        <li key={`edu-${idx}-${j}`} style={bulletItemStyle} dangerouslySetInnerHTML={{ __html: note }} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {achievementsList.length > 0 && (
            <section aria-label="achievements" className="break-inside-avoid-page">
              <h2 style={mainSectionTitle}>Notable Achievements</h2>
              <ul style={bulletListStyle}>
                {achievementsList.map((achievement, i) => (
                  <li key={`ach-${i}`} style={bulletItemStyle}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}