export default function Template3({ data = {}, fontSizeConfig = {}, spacingConfig = {}, previewId = "resume-preview" }) {
  // Destructure with defaults - responsive sizing (same contract as Template1)
  const {
    heading = 'text-[20px] sm:text-[22px] lg:text-[24px] leading-tight font-semibold',
    subheading = 'text-[12px] sm:text-[12.5px] lg:text-[13px] font-semibold',
    body = 'text-[10px] sm:text-[10.5px] lg:text-[11px] leading-snug',
    lineHeight = 'leading-snug',
    letterSpacing = 'tracking-normal',
    sectionMargin = 'mb-2 sm:mb-3 lg:mb-3',
    itemMargin = 'mb-1 sm:mb-1.5 lg:mb-1.5',
    sectionPadding = '',
    borderRadius = '',
    section = 'mb-5 sm:mb-6 lg:mb-6',
    item = 'mb-2.5 sm:mb-3 lg:mb-3',
  } = { ...fontSizeConfig, ...spacingConfig };

  // --- helpers (identical contract to Template1) ---
  const parseList = (text) => {
    if (!text) return [];
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
    return String(text).split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  };

  const formatProjects = (projects) => {
    if (Array.isArray(projects)) {
      return projects
        .filter((project) => project && (project.title || project.description || project.technologies || project.link))
        .map((project) => ({
          title: project.title || '',
          bullets: project.description ? [project.description] : [],
          technologies: project.technologies || '',
          link: project.link || '',
        }));
    }
    if (!projects) return [];
    return String(projects)
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
  const certificationsList = Array.isArray(data.certifications)
    ? data.certifications.map((certification) => {
        if (typeof certification === 'string') return certification.trim();
        if (!certification) return '';
        return [certification.name, certification.issuer, certification.date]
          .filter(Boolean)
          .join(' - ');
      }).filter(Boolean)
    : data.certifications ? String(data.certifications).split('\n').filter(Boolean) : [];
  const achievementsList = formatAchievements(data.achievements);
  const projectsList = formatProjects(data.projects);
  const technicalSkillsList = [
    ...parseList(data.technicalSkills),
    ...parseList(data.nonTechnicalSkills),
    ...parseList(data.skills),
  ];
  const email = String(data.email || '').replace(/\s+/g, '');
  const linkedin = String(data.linkedin || '').replace(/\s+/g, '');
  const linkedinHref = linkedin && (/^https?:\/\//i.test(linkedin) ? linkedin : `https://${linkedin}`);

  const HAIRLINE = '#D8D8D2';
  const TEXT = '#2A2A28';
  const MUTED = '#767570';

  const containerStyle = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '12px 20px 14px',
    backgroundColor: '#ffffff',
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: '10px',
    lineHeight: 1.6,
    color: TEXT,
    boxShadow: 'none',
    borderRadius: 0,
  };

  const nameStyle = {
    margin: 0,
    color: TEXT,
    fontSize: '26pt',
    letterSpacing: '0.5px',
    fontWeight: 400,
    marginBottom: '6px',
    lineHeight: 1.1,
    textAlign: 'center',
  };

  const contactStyle = {
    margin: 0,
    fontSize: '9pt',
    color: MUTED,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  const sectionHeaderStyle = {
    fontSize: '9pt',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '2.5px',
    color: MUTED,
    marginTop: 0,
    marginBottom: '10px',
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  const rowHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '12px',
  };

  const jobTitleStyle = {
    fontSize: '11pt',
    fontWeight: 700,
    color: TEXT,
  };

  const metaStyle = {
    fontSize: '8.5pt',
    color: MUTED,
    whiteSpace: 'nowrap',
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  const bulletListStyle = {
    margin: '4px 0 0 0',
    paddingLeft: '16px',
    fontSize: '9pt',
    lineHeight: 1.55,
    color: TEXT,
  };

  const bulletItemStyle = { marginBottom: '2px' };

  const summaryStyle = {
    fontSize: '10pt',
    lineHeight: 1.6,
    color: TEXT,
    textAlign: 'center',
    maxWidth: '640px',
    margin: '0 auto',
  };

  const skillsRowStyle = { marginBottom: '6px', fontSize: '9pt' };
  const skillsLabelStyle = { fontWeight: 700, marginRight: '6px' };

  return (
    <div
      id={previewId}
      role="document"
      style={containerStyle}
      className={`w-full max-w-4xl mx-auto px-6 py-4 ${lineHeight} ${letterSpacing} text-gray-800 print:max-w-none print:shadow-none print:rounded-none`}
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

      {/* Header */}
      <header className={`${sectionMargin} ${sectionPadding} ${borderRadius}`} style={{ marginBottom: '18px' }}>
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
          {data.city && <span>City: {data.city}</span>}
          {data.email && <span>Email: {data.email}</span>}
          {data.phone && <span>Phone: {data.phone}</span>}
          {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
        </div>

        <h1 className={`${heading}`} style={nameStyle}>{data.name || 'Charles Bloomberg'}</h1>
        <div className={`${body} ${itemMargin}`} style={contactStyle}>
          {data.city && <span>{data.city}</span>}
          {data.city && (email || data.phone || linkedin) && <span>·</span>}
          <span>{email || 'email@example.com'}</span>
          {data.phone && <span>·</span>}
          {data.phone && <span>{data.phone}</span>}
          {linkedin && <span>·</span>}
          {linkedin && <a href={linkedinHref} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{linkedin}</a>}
        </div>
        <div className="mt-4" style={{ height: '1px', backgroundColor: HAIRLINE }} />
      </header>

      {/* Summary */}
      {data.summary && (
        <section aria-label="Professional Summary" className={`${section} break-inside-avoid-page`} style={{ textAlign: 'center' }}>
          <div
            className={`${body}`}
            style={summaryStyle}
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </section>
      )}

      {/* Experience */}
      {experienceList.length > 0 && (
        <section aria-label="Work Experience" className={`${section} break-inside-avoid-page`}>
          <h2 style={sectionHeaderStyle}>Experience</h2>
          {experienceList.map((exp, i) => (
            <div key={`exp-${i}`} className={`${item} break-inside-avoid-page`}>
              <div style={rowHeaderStyle}>
                <div>
                  <span className={subheading} style={jobTitleStyle}>{exp.title}</span>
                  {exp.company && <span style={{ color: MUTED }}>{'  ·  ' + exp.company}</span>}
                </div>
                <span style={metaStyle}>
                  {exp.startDate && exp.endDate
                    ? `${exp.startDate} – ${exp.endDate}`
                    : exp.startDate
                    ? `${exp.startDate} – Present`
                    : exp.endDate || ''}
                  {exp.location && ` · ${exp.location}`}
                </span>
              </div>
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
        <section aria-label="projects" className={`${section} break-inside-avoid-page`}>
          <h2 style={sectionHeaderStyle}>Projects</h2>
          {projectsList.map((project, i) => (
            <div key={`project-${i}`} className={`${item} break-inside-avoid-page`}>
              <div className={subheading} style={jobTitleStyle}>{project.title}</div>
              {project.bullets.length > 0 && (
                <ul style={bulletListStyle}>
                  {project.bullets.map((bullet, j) => (
                    <li key={`project-${i}-${j}`} style={bulletItemStyle} dangerouslySetInnerHTML={{ __html: bullet }} />
                  ))}
                </ul>
              )}
              {project.technologies && (
                <div style={{ fontSize: '8.5pt', color: MUTED, marginTop: '3px' }}>{project.technologies}</div>
              )}
              {project.link && (
                <div style={{ fontSize: '8.5pt', color: MUTED, marginTop: '2px' }}>{project.link}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {educationList.length > 0 && (
        <section aria-label="Education" className={`${section} break-inside-avoid-page`}>
          <h2 style={sectionHeaderStyle}>Education</h2>
          {educationList.map((edu, idx) => (
            <div key={`edu-${idx}`} className={`${item} break-inside-avoid-page`}>
              <div style={rowHeaderStyle}>
                <div>
                  <span className={subheading} style={jobTitleStyle}>{edu.degree}</span>
                  {edu.school && <span style={{ color: MUTED }}>{'  ·  ' + edu.school}</span>}
                </div>
                <span style={metaStyle}>
                  {edu.startDate && edu.endDate
                    ? `${edu.startDate} – ${edu.endDate}`
                    : edu.startDate
                    ? `${edu.startDate} – Present`
                    : edu.endDate || ''}
                  {edu.location && ` · ${edu.location}`}
                </span>
              </div>
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

      {/* Certifications */}
      {certificationsList.length > 0 && (
        <section aria-label="certifications" className={`${section} break-inside-avoid-page`}>
          <h2 style={sectionHeaderStyle}>Certifications</h2>
          <ul style={bulletListStyle}>
            {certificationsList.map((cert, i) => (
              <li key={`cert-${i}`} style={bulletItemStyle}>{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievementsList.length > 0 && (
        <section aria-label="achievements" className={`${section} break-inside-avoid-page`}>
          <h2 style={sectionHeaderStyle}>Notable Achievements</h2>
          <ul style={bulletListStyle}>
            {achievementsList.map((achievement, i) => (
              <li key={`ach-${i}`} style={bulletItemStyle}>{achievement}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      <section aria-label="Skills" className="break-inside-avoid-page">
        <h2 style={sectionHeaderStyle}>Skills</h2>
        {technicalSkillsList.length > 0 && (
          <div style={skillsRowStyle}>
            <span style={skillsLabelStyle}>Technical:</span>
            <span>{technicalSkillsList.join(', ')}</span>
          </div>
        )}
        {languagesList.length > 0 && (
          <div style={skillsRowStyle}>
            <span style={skillsLabelStyle}>Languages:</span>
            <span>{languagesList.join(', ')}</span>
          </div>
        )}
        {interestsList.length > 0 && (
          <div style={skillsRowStyle}>
            <span style={skillsLabelStyle}>Interests:</span>
            <span>{interestsList.join(', ')}</span>
          </div>
        )}
      </section>
    </div>
  );
}