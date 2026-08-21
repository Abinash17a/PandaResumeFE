export default function Template3({ data }) {
  const sectionTitleStyle = {
    fontSize: "1.3em",
    fontWeight: "bold",
    color: "#000",
    marginTop: "25px",
    marginBottom: "8px",
    borderBottom: "2px solid #000",
    paddingBottom: "3px",
    textTransform: "uppercase",
  };

  return (
    // The wrapper component for the entire resume
    <div 
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
          // 3. Crucial for print: Keep the header elements together on one page
          breakAfter: 'avoid', 
          breakInside: 'avoid',
        }}
      >
        <h1 style={{ margin: "0", fontSize: "2.5em" }}>{data.name}</h1>
        <div style={{ textAlign: "right", fontSize: "0.9em" }}>
          <p style={{ margin: "0" }}>✉️ {data.email}</p>
          <p style={{ margin: "0" }}>📞 {data.phone}</p>
        </div>
      </div>
      <div style={{ borderTop: "5px solid #222", marginBottom: "15px", breakAfter: 'avoid' }}></div>

      {/* Summary */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>SUMMARY</h3>
        <p style={{ fontSize: "0.95em", lineHeight: "1.5" }}>{data.summary}</p>
      </section>

      {/* Skills */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>SKILLS</h3>
        <p style={{ fontSize: "0.95em", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>{data.skills}</p>
      </section>

      {/* Education */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>EDUCATION</h3>
        <div style={{ fontSize: "0.95em", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
          {data.education}
        </div>
      </section>

      {/* Experience */}
      <section style={{ breakInside: 'avoid' }}>
        <h3 style={sectionTitleStyle}>EXPERIENCE</h3>
        <div style={{ fontSize: "0.95em", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
          {data.experience}
        </div>
      </section>
    </div>
  );
}