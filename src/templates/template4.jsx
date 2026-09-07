// Declared at module scope (not inside Template4) so React doesn't treat it
// as a new component type on every render — that was the "Cannot create
// components during render" error. Bar color passed in via props since it
// depends on the template's constants.
const SECTION_HEADER_WRAP_STYLE = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 0,
  marginBottom: '6px',
};

const SECTION_HEADER_TEXT_STYLE = {
  fontSize: '9.5pt',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  lineHeight: 1.3,
};

function SectionHeader({ children, barColor, textColor }) {
  return (
    <div style={SECTION_HEADER_WRAP_STYLE}>
      <div style={{ width: '3px', height: '11px', backgroundColor: barColor, marginRight: '10px', flexShrink: 0 }} />
      <h2 style={{ ...SECTION_HEADER_TEXT_STYLE, color: textColor }}>{children}</h2>
    </div>
  );
}

export default function Template4({ data = {}, fontSizeConfig = {}, spacingConfig = {}, previewId = "resume-preview" }) {
  // Destructure with defaults - responsive sizing (same contract as Template1)
  const {
    heading = 'text-[19px] sm:text-[21px] lg:text-[23px] leading-tight font-bold',
    subheading = 'text-[12px] sm:text-[12.5px] lg:text-[13px] font-bold',
    body = 'text-[10px] sm:text-[10.5px] lg:text-[11px] leading-snug',
    lineHeight = 'leading-snug',
    letterSpacing = 'tracking-normal',
    sectionMargin = 'mb-2 sm:mb-2.5 lg:mb-2.5',
    itemMargin = 'mb-1 sm:mb-1.5 lg:mb-1.5',
    sectionPadding = '',
    borderRadius = '',
    section = 'mb-3.5 sm:mb-4 lg:mb-4',
    item = 'mb-2 sm:mb-2.5 lg:mb-2.5',
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

  // Certifications may arrive as an array of objects (from the structured
  // form), an array of plain strings, or a single newline-separated string
  // (from formattedData upstream) — handle all three, same pattern as
  // formatProjects below.
  const parseCertifications = (certifications) => {
    if (Array.isArray(certifications)) {
      return certifications
        .map((cert) => {
          if (typeof cert === 'string') return cert.trim();
          if (!cert) return '';
          const namePart = [cert.name, cert.issuer].filter(Boolean).join(' - ');
          const datePart = cert.date ? ` (${cert.date})` : '';
          const expiryPart = cert.expiryDate ? ` - Expires: ${cert.expiryDate}` : '';
          return `${namePart}${datePart}${expiryPart}`.trim();
        })
        .filter(Boolean);
    }
    if (!certifications) return [];
    return String(certifications).split('\n').filter(Boolean);
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
  const certificationsList = parseCertifications(data.certifications);
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

  const BAND = '#2F5D62';
  const BAND_MUTED = '#BFDAD9';
  const TEXT = '#232323';
  const MUTED = '#666666';
  const TAG_BG = '#EAF2F1';

  const containerStyle = {
    width: '100%',
    maxWidth: '795px',
    margin: '0 auto',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '10px',
    lineHeight: 1.45,
    color: TEXT,
    boxShadow: 'none',
    borderRadius: 0,
    overflow: 'hidden',
  };

  const bandStyle = {
    backgroundColor: BAND,
    padding: '18px 24px 16px',
  };

  const nameStyle = {
    margin: 0,
    color: '#ffffff',
    fontSize: '22pt',
    letterSpacing: '0.3px',
    fontWeight: 700,
    marginBottom: '6px',
    lineHeight: 1.1,
  };

  const contactStyle = {
    margin: 0,
    fontSize: '9pt',
    color: BAND_MUTED,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  };

  const bodyPadStyle = { padding: '16px 24px 18px' };

  // All section body content (job titles, bullets, pills, etc.) starts at
  // this same left edge — flush with the container padding, matching the
  // label text's left edge exactly (no section indents further than others).
  const jobTitleStyle = {
    fontSize: '10.5pt',
    fontWeight: 700,
    color: TEXT,
  };

  const metaStyle = {
    fontSize: '8.5pt',
    color: MUTED,
  };

  const bulletListStyle = {
    margin: '3px 0 0 0',
    paddingLeft: '16px',
    fontSize: '9pt',
    lineHeight: 1.45,
  };

  const bulletItemStyle = { marginBottom: '1px' };

  const summaryStyle = {
    fontSize: '9.5pt',
    lineHeight: 1.5,
    color: TEXT,
  };

  const pillStyle = {
    display: 'inline-block',
    backgroundColor: TAG_BG,
    color: BAND,
    fontSize: '8.5pt',
    fontWeight: 600,
    padding: '2px 9px',
    borderRadius: '999px',
    marginRight: '5px',
    marginBottom: '5px',
  };

  // Visually-hidden (not "moved off-canvas") — safe for html2canvas/print.
  // "-9999px" style hiding still counts toward the layout's bounding box,
  // which inflates/shifts the canvas html2pdf captures. This clips to
  // 1x1px instead, so it can't distort the exported PDF.
  const srOnlyStyle = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  };

  return (
    <div
      id={previewId}
      role="document"
      style={containerStyle}
      className={`w-full max-w-4xl mx-auto ${lineHeight} ${letterSpacing} text-gray-800 print:max-w-none print:shadow-none print:rounded-none`}
    >
      {/* ATS-friendly hidden content */}
      <div style={srOnlyStyle} aria-hidden="true">
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

      {/* Header band */}
      <header style={bandStyle} className={`${sectionMargin}`}>
        <div style={srOnlyStyle} aria-hidden="true">
          {data.city && <span>City: {data.city}</span>}
          {data.email && <span>Email: {data.email}</span>}
          {data.phone && <span>Phone: {data.phone}</span>}
          {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
        </div>

        <h1 className={`${heading}`} style={nameStyle}>{data.name || 'Charles Bloomberg'}</h1>
        <div className={`${body}`} style={contactStyle}>
          {data.city && <span>{data.city}</span>}
          {data.city && <span>•</span>}
          <span>{email || 'email@example.com'}</span>
          {data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {linkedin && <span>•</span>}
          {linkedin && <a href={linkedinHref} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{linkedin}</a>}
        </div>
      </header>

      <div style={bodyPadStyle}>
        {/* Summary */}
        {data.summary && (
          <section aria-label="Professional Summary" className={`${section} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeader barColor={BAND} textColor={BAND}>Summary</SectionHeader>
            <div className={`${body}`} style={summaryStyle} dangerouslySetInnerHTML={{ __html: data.summary }} />
          </section>
        )}

        {/* Experience */}
        {experienceList.length > 0 && (
          <section aria-label="Work Experience" className={`${section} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeader barColor={BAND} textColor={BAND}>Experience</SectionHeader>
            {experienceList.map((exp, i) => (
              <div key={`exp-${i}`} className={`${item} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
                <div className={subheading} style={jobTitleStyle}>{exp.title}</div>
                <div style={metaStyle}>
                  {exp.company}
                  {exp.company && (exp.startDate || exp.endDate || exp.location) && ' • '}
                  {exp.startDate && exp.endDate
                    ? `${exp.startDate} – ${exp.endDate}`
                    : exp.startDate
                    ? `${exp.startDate} – Present`
                    : exp.endDate || ''}
                  {exp.location && ` • ${exp.location}`}
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
          <section aria-label="projects" className={`${section} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeader barColor={BAND} textColor={BAND}>Projects</SectionHeader>
            {projectsList.map((project, i) => (
              <div key={`project-${i}`} className={`${item} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
                <div className={subheading} style={jobTitleStyle}>{project.title}</div>
                {project.bullets.length > 0 && (
                  <ul style={bulletListStyle}>
                    {project.bullets.map((bullet, j) => (
                      <li key={`project-${i}-${j}`} style={bulletItemStyle} dangerouslySetInnerHTML={{ __html: bullet }} />
                    ))}
                  </ul>
                )}
                {project.technologies && <div style={metaStyle}>{project.technologies}</div>}
                {project.link && <div style={metaStyle}>{project.link}</div>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <section aria-label="Education" className={`${section} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeader barColor={BAND} textColor={BAND}>Education</SectionHeader>
            {educationList.map((edu, idx) => (
              <div key={`edu-${idx}`} className={`${item} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
                <div className={subheading} style={jobTitleStyle}>{edu.degree}</div>
                <div style={metaStyle}>
                  {edu.school}
                  {edu.school && (edu.startDate || edu.endDate || edu.location) && ' • '}
                  {edu.startDate && edu.endDate
                    ? `${edu.startDate} – ${edu.endDate}`
                    : edu.startDate
                    ? `${edu.startDate} – Present`
                    : edu.endDate || ''}
                  {edu.location && ` • ${edu.location}`}
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
          <section aria-label="certifications" className={`${section} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeader barColor={BAND} textColor={BAND}>Certifications</SectionHeader>
            <ul style={bulletListStyle}>
              {certificationsList.map((cert, i) => (
                <li key={`cert-${i}`} style={bulletItemStyle}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Achievements */}
        {achievementsList.length > 0 && (
          <section aria-label="achievements" className={`${section} break-inside-avoid-page`} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeader barColor={BAND} textColor={BAND}>Notable Achievements</SectionHeader>
            <ul style={bulletListStyle}>
              {achievementsList.map((achievement, i) => (
                <li key={`ach-${i}`} style={bulletItemStyle}>{achievement}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills — pill tags. Body content is flush left, same as every
            other section above — no extra indent beyond the header. */}
        <section aria-label="Skills" className="break-inside-avoid-page" style={{ pageBreakInside: 'avoid' }}>
          <SectionHeader barColor={BAND} textColor={BAND}>Skills</SectionHeader>
          {technicalSkillsList.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              {technicalSkillsList.map((skill, i) => (
                <span key={`skill-${i}`} style={pillStyle}>{skill}</span>
              ))}
            </div>
          )}
          {languagesList.length > 0 && (
            <div style={{ fontSize: '9pt', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, marginRight: '6px' }}>Languages:</span>
              {languagesList.join(', ')}
            </div>
          )}
          {interestsList.length > 0 && (
            <div style={{ fontSize: '9pt' }}>
              <span style={{ fontWeight: 700, marginRight: '6px' }}>Interests:</span>
              {interestsList.join(', ')}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}