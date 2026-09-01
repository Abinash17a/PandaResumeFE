import { useNavigate } from "react-router-dom";
import { Eye, ShieldCheck, LayoutTemplate, Type, Download, Lock } from "lucide-react";

const INK = "#16233F";
const PAPER = "#FDFCF9";
const ACCENT = "#B8862E";
const MUTED = "#5B6472";
const LINE = "#E3DFD5";
const NAVY = "#101A30";

const FEATURES = [
  {
    icon: Eye,
    title: "Live preview as you type",
    body: "Watch your resume update in real time, zoom in and check every line before you commit to it.",
  },
  {
    icon: ShieldCheck,
    title: "Built for ATS",
    body: "Every template keeps a clean, parseable structure so applicant-tracking software reads it correctly.",
  },
  {
    icon: LayoutTemplate,
    title: "Switch templates freely",
    body: "Change layouts any time — your details carry over, so you never re-type anything to try a new look.",
  },
  {
    icon: Type,
    title: "Fit it to one page",
    body: "Adjust text size on the fly to keep a tight one-page resume without cramming or truncating content.",
  },
  {
    icon: Download,
    title: "One-click PDF export",
    body: "Download a polished, print-ready PDF the moment your resume is ready — no formatting clean-up needed.",
  },
  {
    icon: Lock,
    title: "No sign-up required",
    body: "Start building immediately. Your progress saves on your device, so there's nothing to lose by trying it.",
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: PAPER }} className="min-h-screen">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-30 bg-[--paper]/90 backdrop-blur border-b"
        style={{ backgroundColor: `${PAPER}E6`, borderColor: LINE }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <span
            className="font-serif text-xl sm:text-2xl tracking-tight"
            style={{ color: INK }}
          >
            ResumeBuilder
          </span>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm" style={{ color: MUTED }}>
              Features
            </a>
            <a href="#how-it-works" className="text-sm" style={{ color: MUTED }}>
              How it works
            </a>
            <a href="#templates" className="text-sm" style={{ color: MUTED }}>
              Templates
            </a>
            <button
              onClick={() => navigate("/templates")}
              className="px-5 py-2 rounded-md text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: INK }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
            >
              Create resume
            </button>
          </div>

          <button
            onClick={() => navigate("/templates")}
            className="md:hidden px-4 py-2 rounded-md text-sm font-medium text-white"
            style={{ backgroundColor: INK }}
          >
            Start
          </button>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <h1
                className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight"
                style={{ color: INK }}
              >
                A resume that reads
                <br className="hidden sm:block" /> like you mean it
              </h1>

              <p
                className="mt-6 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed"
                style={{ color: MUTED }}
              >
                Lay out your experience, pick a template built for
                applicant-tracking systems, and export a document hiring
                managers actually finish reading.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigate("/templates")}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-md text-white text-base font-medium transition-colors"
                  style={{ backgroundColor: ACCENT }}
                >
                  Create my resume
                </button>
                <a
                  href="#templates"
                  className="text-sm font-medium border-b pb-0.5"
                  style={{ color: INK, borderColor: INK }}
                >
                  See templates
                </a>
              </div>

              <p className="mt-8 text-sm" style={{ color: MUTED }}>
                No sign-up required to start. Save your progress once you do.
              </p>
            </div>

            {/* Document mockup — signature visual */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none select-none">
              <div
                className="absolute inset-0 rounded-lg rotate-3 translate-x-3 translate-y-3 hidden sm:block"
                style={{ backgroundColor: NAVY, opacity: 0.08 }}
              />
              <div
                className="relative rounded-lg border shadow-[0_20px_50px_-20px_rgba(16,26,48,0.35)] px-7 py-8 sm:px-9 sm:py-10 -rotate-1"
                style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-14 w-14 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#EFE7D6" }}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-28 rounded-full" style={{ backgroundColor: INK }} />
                    <div className="h-2 w-40 rounded-full" style={{ backgroundColor: LINE }} />
                  </div>
                </div>

                <div className="mt-7 h-px w-full" style={{ backgroundColor: LINE }} />

                {["Experience", "Education", "Skills"].map((label, i) => (
                  <div key={label} className={i === 0 ? "mt-6" : "mt-5"}>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <span
                        className="text-[11px] font-semibold tracking-wide"
                        style={{ color: INK }}
                      >
                        {label}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1.5 pl-3.5">
                      <div className="h-2 rounded-full w-full" style={{ backgroundColor: LINE }} />
                      <div className="h-2 rounded-full w-5/6" style={{ backgroundColor: LINE }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight" style={{ color: INK }}>
              Everything you need, nothing you don't
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
              Built around the parts of resume writing people actually get
              stuck on — not another blank text editor.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES.map((feature) => {
              const IconComponent = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-lg border p-6 transition-transform hover:-translate-y-1"
                  style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#F3ECDD" }}
                  >
                    <IconComponent size={18} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold" style={{ color: INK }}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ backgroundColor: NAVY }} className="py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                Three steps to a finished resume
              </h2>
              <p className="mt-4 text-base" style={{ color: "#9AA4BC" }}>
                No blank page. Start from a layout and fill in the details
                that make you the right hire.
              </p>
            </div>

            <div className="mt-14 grid sm:grid-cols-3 gap-10 sm:gap-8">
              {[
                {
                  n: "01",
                  title: "Pick a template",
                  body: "Choose a layout suited to your field, from clean and minimal to design-forward.",
                },
                {
                  n: "02",
                  title: "Fill in your details",
                  body: "Add your experience once — the template handles the formatting and spacing.",
                },
                {
                  n: "03",
                  title: "Download & apply",
                  body: "Export a polished, ATS-friendly PDF ready to attach to any application.",
                },
              ].map((step) => (
                <div key={step.n} className="border-t pt-6" style={{ borderColor: "#2A3550" }}>
                  <span
                    className="font-serif text-2xl"
                    style={{ color: ACCENT }}
                  >
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9AA4BC" }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates */}
        <section id="templates" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight" style={{ color: INK }}>
                Templates for every field
              </h2>
              <p className="mt-3 text-base max-w-md" style={{ color: MUTED }}>
                Every template is built to survive resume-scanning software
                and still look considered to a human reader.
              </p>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/templates");
              }}
              className="text-sm font-medium border-b pb-0.5 whitespace-nowrap self-start sm:self-auto"
              style={{ color: INK, borderColor: INK }}
            >
              View all templates
            </a>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Classic", accent: "#B8862E" },
              { name: "Modern", accent: "#3E6E8E" },
              { name: "Minimal", accent: "#5B6472" },
            ].map((tpl) => (
              <div
                key={tpl.name}
                className="rounded-lg border p-5 transition-transform hover:-translate-y-1"
                style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
              >
                <div className="rounded-md border p-4" style={{ borderColor: LINE }}>
                  <div className="h-2.5 w-2/5 rounded-full" style={{ backgroundColor: tpl.accent }} />
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: LINE }} />
                    <div className="h-1.5 w-4/5 rounded-full" style={{ backgroundColor: LINE }} />
                    <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: LINE }} />
                    <div className="h-1.5 w-3/5 rounded-full" style={{ backgroundColor: LINE }} />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium" style={{ color: INK }}>
                  {tpl.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t" style={{ borderColor: LINE }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight" style={{ color: INK }}>
              Your next role starts with the resume that gets it read
            </h2>
            <button
              onClick={() => navigate("/templates")}
              className="mt-7 px-8 py-3.5 rounded-md text-white text-base font-medium"
              style={{ backgroundColor: ACCENT }}
            >
              Create my resume
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-white text-lg">ResumeBuilder</span>
          <p className="text-sm" style={{ color: "#8A93AC" }}>
            &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;