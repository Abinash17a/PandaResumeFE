export default function Template3({ data }) {
  const sectionTitleStyle = {
    fontSize: "1.1em",
    fontWeight: "bold",
    color: "#000",
    marginTop: "18px",
    marginBottom: "6px",
    borderBottom: "1px solid #000",
    paddingBottom: "2px",
    textTransform: "uppercase",
  };

  return (
    // The wrapper component for the entire resume
    <div 
      id="resume-preview"
      style={{ 
        fontFamily: "Roboto, Helvetica, sans-serif", 
        color: "#222", 
        // 1. Set the fixed printable width
        width: "210mm", 
        // 2. Set margins for the entire document
        margin: "0 auto", 
        padding: "25mm",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          paddingBottom: "10px",
          // 3. Crucial for print: Keep header elements together on one page
          breakAfter: 'avoid', 
          breakInside: 'avoid',
        }}
      >
        {/* Hidden ATS-friendly contact info */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
          {data.email && <span>Email: {data.email}</span>}
          {data.phone && <span>Phone: {data.phone}</span>}
          {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
        </div>
        
        <h1 style={{ margin: "0", fontSize: "1.8em" }}>{data.name}</h1>
        <div style={{ textAlign: "right", fontSize: "0.8em" }}>
          {data.email && (
            <p style={{ margin: "0", fontSize: "0.8em", display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.email}
            </p>
          )}
          {data.phone && (
            <p style={{ margin: "0", fontSize: "0.8em", display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.phone}
            </p>
          )}
          {data.linkedin && (
            <p style={{ margin: "0", fontSize: "0.8em", display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              {data.linkedin}
            </p>
          )}
        </div>
      </div>
      <div style={{ borderTop: "5px solid #222", marginBottom: "15px", breakAfter: 'avoid' }}></div>

      {/* About Me */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>ABOUT ME</h3>
        <div style={{ fontSize: "0.75em", lineHeight: "1.4", margin: "0 0 8px 0" }} dangerouslySetInnerHTML={{ __html: data.summary }} />
      </section>

      {/* Skills */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>SKILLS</h3>
        <p style={{ fontSize: "0.75em", lineHeight: "1.4", whiteSpace: "pre-wrap", margin: "0 0 8px 0" }}>{data.skills}</p>
      </section>

      {/* Education */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>EDUCATION</h3>
        <div style={{ fontSize: "0.85em", lineHeight: "1.4", whiteSpace: "pre-wrap", marginBottom: "8px" }}>
          {data.education}
        </div>
      </section>

      {/* Experience */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>EXPERIENCE</h3>
        <div style={{ fontSize: "0.85em", lineHeight: "1.4", whiteSpace: "pre-wrap", marginBottom: "8px" }}>
          {data.experience}
        </div>
      </section>
    </div>
  );
}