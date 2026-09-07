import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { createWorker } from "tesseract.js";
import { createId } from "./id.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const SECTION_NAMES = [
  "summary",
  "professional summary",
  "objective",
  "experience",
  "work experience",
  "employment history",
  "education",
  "skills",
  "technical skills",
  "certifications",
  "projects",
  "achievements",
  "notable achievements",
  "awards",
  "languages",
  "interests",
];

const headingKey = (line) => {
  const normalized = line.toLowerCase().replace(/[^a-z]/g, "");
  const matchedName = SECTION_NAMES.find((name) => normalized === name.replace(/[^a-z]/g, ""));
  if (matchedName === "notable achievements" || matchedName === "awards") return "achievements";
  return matchedName || null;
};

const splitHeading = (line) => {
  const normalized = line.toLowerCase().replace(/[^a-z]/g, "");
  const match = SECTION_NAMES
    .map((name) => ({ name, normalized: name.replace(/[^a-z]/g, "") }))
    .sort((first, second) => second.normalized.length - first.normalized.length)
    .find(({ normalized: heading }) => normalized.includes(heading));

  if (!match) return null;

  const headingStart = normalized.indexOf(match.normalized);
  let lettersSeen = 0;
  let originalStart = 0;
  while (originalStart < line.length && lettersSeen < headingStart) {
    if (/[a-z]/i.test(line[originalStart])) lettersSeen += 1;
    originalStart += 1;
  }

  let originalEnd = originalStart;
  let headingLetters = 0;
  while (originalEnd < line.length && headingLetters < match.normalized.length) {
    if (/[a-z]/i.test(line[originalEnd])) headingLetters += 1;
    originalEnd += 1;
  }

  // Do not treat words such as "Experienced" or "Skills-based" as headings.
  if (
    (originalStart > 0 && /[a-z]/i.test(line[originalStart - 1])) ||
    (originalEnd < line.length && /[a-z]/i.test(line[originalEnd]))
  ) {
    return null;
  }

  return {
    key: match.name === "notable achievements" || match.name === "awards" ? "achievements" : match.name,
    before: line.slice(0, originalStart).trim(),
    after: line.slice(originalEnd).trim(),
  };
};

const cleanLines = (text) => text
  .split(/\r?\n/)
  .map((line) => line.replace(/[•▪●]/g, "-").replace(/\s+/g, " ").trim())
  .filter(Boolean);

const spacedEmailPattern = /[A-Z0-9_%+-]+(?:\s*\.\s*[A-Z0-9_%+-]+)*\s*@\s*[A-Z0-9-]+(?:\s*\.\s*[A-Z]{2,})/i;

const compactContactValue = (value) => value.replace(/\s+/g, "").trim();

const dateValue = (value) => {
  const match = value?.match(/(19|20)\d{2}/);
  return match ? match[0] : "";
};

const isOcrNoise = (line) => {
  const letters = line.toLowerCase().replace(/[^a-z]/g, "");
  if (letters.length < 3) return true;
  const counts = [...new Set(letters)].map((letter) => letters.split(letter).length - 1);
  return Math.max(...counts) / letters.length > 0.65;
};

const parseExperience = (lines) => {
  const entries = [];
  let current = null;
  const datePattern = /(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?(?:19|20)\d{2}(?:-\d{1,2}-\d{1,2})?\s*(?:-|–|to)\s*(?:Present|Current|(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?(?:19|20)\d{2}(?:-\d{1,2}-\d{1,2})?)/i;

  lines.forEach((line) => {
    const dateMatch = line.match(datePattern);
    if (dateMatch) {
      const beforeDate = line.slice(0, dateMatch.index).replace(/[•|]+\s*$/, "").trim();
      const afterDate = line.slice(dateMatch.index + dateMatch[0].length).replace(/^[•|]+\s*/, "").trim();
      const parts = beforeDate.split(/\s+at\s+/i);
      if (current?.startDate) entries.push(current);
      current = {
        id: current?.id || createId(),
        title: parts[0].trim(),
        company: parts[1]?.trim() || "",
        location: afterDate,
        startDate: dateValue(dateMatch[0].split(/-|–|to/i)[0]),
        endDate: dateMatch[0].match(/Present|Current/i) ? "" : dateValue(dateMatch[0].split(/-|–|to/i)[1]),
        current: Boolean(dateMatch[0].match(/Present|Current/i)),
        description: current?.startDate ? "" : current?.description || "",
      };
      return;
    }

    if (current) {
      current.description = `${current.description}${current.description ? "\n" : ""}${line}`;
    }
  });

  if (current) entries.push(current);
  return entries.filter((entry) => entry.title || entry.company || entry.description);
};

const parseEducation = (lines) => lines
  .filter((line) => !isOcrNoise(line) && (/(19|20)\d{2}/.test(line) || /\b(b\.?\s?tech|b\.?\s?sc|bca|m\.?\s?tech|mca|phd|bachelor|master|doctor)/i.test(line)))
  .map((line) => {
    const dateMatch = line.match(/((?:19|20)\d{2})(?:-\d{1,2}-\d{1,2})?\s*(?:-|–|to)\s*((?:19|20)\d{2})(?:-\d{1,2}-\d{1,2})?/i);
    const beforeDates = dateMatch ? line.slice(0, dateMatch.index).trim() : line;
    const schoolParts = beforeDates.split(/\s*[.|]\s*|\s+at\s+/i).map((part) => part.trim()).filter(Boolean);

    return {
      id: createId(),
      degree: schoolParts[0] || line,
      school: schoolParts[1] || "",
      location: dateMatch ? line.slice(dateMatch.index + dateMatch[0].length).replace(/^[•|]+\s*/, "").trim() : "",
      startDate: dateMatch?.[1] || dateValue(line),
      endDate: dateMatch?.[2] || "",
      current: false,
      notes: "",
    };
  });

const parseProjects = (lines) => {
  const projects = [];
  let current = null;

  lines.forEach((line) => {
    if (isOcrNoise(line)) return;
    const labelMatch = line.match(/^(Technologies|Tech(?:nologies)?|Link)\s*:\s*(.*)$/i);
    if (!current || (!labelMatch && current.link)) {
      if (current) projects.push(current);
      current = { id: createId(), title: line, description: "", technologies: "", startDate: "", endDate: "", link: "" };
      return;
    }

    if (labelMatch) {
      if (/link/i.test(labelMatch[1])) current.link = labelMatch[2].trim();
      else current.technologies = labelMatch[2].trim();
    } else {
      current.description = `${current.description}${current.description ? "\n" : ""}${line}`;
    }
  });

  if (current) projects.push(current);
  return projects;
};

const extractOcrText = async (pdf) => {
  const worker = await createWorker("eng");
  const pages = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      const result = await worker.recognize(canvas);
      pages.push(result.data.text);
    }
  } finally {
    await worker.terminate();
  }

  return pages.join("\n");
};

export const extractResumeFromPdf = async (file) => {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const linesByPosition = new Map();

    content.items.forEach((item) => {
      const text = item.str?.trim();
      if (!text) return;

      const yPosition = Math.round(item.transform[5]);
      const line = linesByPosition.get(yPosition) || [];
      line.push({ x: item.transform[4], text });
      linesByPosition.set(yPosition, line);
    });

    pages.push([...linesByPosition.entries()]
      .sort(([firstY], [secondY]) => secondY - firstY)
      .map(([, items]) => items
        .sort((first, second) => first.x - second.x)
        .map((item) => item.text)
        .join(" "))
      .join("\n"));
  }

  let extractedText = pages.join("\n");
  if (!extractedText.replace(/\s/g, "")) {
    extractedText = await extractOcrText(pdf);
  }

  const lines = cleanLines(extractedText);
  const sections = {};
  let activeSection = "header";
  sections[activeSection] = [];

  lines.forEach((line) => {
    const heading = splitHeading(line);
    if (heading) {
      if (heading.before) sections[activeSection].push(heading.before);
      activeSection = heading.key;
      sections[activeSection] ||= [];
      if (heading.after) sections[activeSection].push(heading.after);
      return;
    }

    sections[activeSection].push(line);
  });

  const headerText = (sections.header || []).join(" ");
  const emailMatch = headerText.match(spacedEmailPattern);
  const email = emailMatch ? compactContactValue(emailMatch[0]) : "";
  const phone = headerText.match(/(?:\+?\d[\d ()-]{7,}\d)/)?.[0]?.trim() || "";
  const linkedinMatch = headerText.match(/(?:https?:\/\/\s*)?linkedin\s*\.\s*com\s*\/\s*[A-Z0-9._/-]+/i);
  const linkedin = linkedinMatch ? compactContactValue(linkedinMatch[0]) : "";
  const headerWithoutContacts = headerText
    .replace(emailMatch?.[0] || "", "")
    .replace(phone, "")
    .replace(linkedinMatch?.[0] || "", "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/[|•·]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const name = (sections.header || []).find((line) =>
    /^[A-Za-z][A-Za-z .'-]{2,}$/.test(line) && !headingKey(line) && !spacedEmailPattern.test(line)
  ) || headerWithoutContacts;
  const summaryLines = [...(sections.summary || []), ...(sections["professional summary"] || []), ...(sections.objective || [])];
  const skillLines = [...(sections.skills || []), ...(sections["technical skills"] || [])];

  return {
    name,
    email,
    phone,
    linkedin,
    city: "",
    summary: summaryLines.join(" "),
    technicalSkills: skillLines.join(", ").split(/[,;|]/).map((skill) => skill.trim()).filter(Boolean),
    nonTechnicalSkills: [],
    experiences: parseExperience([...(sections.experience || []), ...(sections["work experience"] || []), ...(sections["employment history"] || [])]),
    educationItems: parseEducation(sections.education || []),
    certifications: (sections.certifications || [])
      .filter((name) => !isOcrNoise(name))
      .map((name) => ({ id: createId(), name, issuer: "", date: "", expiryDate: "" })),
    projects: parseProjects(sections.projects || []),
    achievements: [...(sections.achievements || []), ...(sections.awards || [])].filter((line) => !isOcrNoise(line)),
    languages: (sections.languages || []).filter((language) => !isOcrNoise(language)).map((language) => ({ id: createId(), language, proficiency: "" })),
    interests: (sections.interests || []).filter((line) => !isOcrNoise(line)),
  };
};