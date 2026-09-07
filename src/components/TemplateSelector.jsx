'use client';

import { CheckCircle2 } from 'lucide-react';
import classicPreview from '../assets/templates/classic.png';
import modernPreview from '../assets/templates/mordern.png';
import minimalPreview from '../assets/templates/minimal.png';
import blankCanvasPreview from '../assets/templates/Green.png';

const INK = '#16233F';
const ACCENT = '#B8862E';
const MUTED = '#5B6472';
const LINE = '#E3DFD5';

const templates = [
  {
    id: 'template1',
    name: 'Classic',
    description: 'Clean, structured layout suited to traditional roles.',
    accent: '#B8862E',
    preview: classicPreview,
  },
  {
    id: 'template2',
    name: 'Modern',
    description: 'Contemporary design with bolder section headings.',
    accent: '#3E6E8E',
    preview: modernPreview,
  },
  {
    id: 'template3',
    name: 'Minimal',
    description: 'A refined, lightweight layout for polished and concise resumes.',
    accent: '#5A7C5A',
    preview: minimalPreview,
  },
  {
    id: 'template4',
    name: 'Freeform',
    description: 'A flexible foundation for creating your own resume style.',
    accent: '#246B6B',
    preview: blankCanvasPreview,
  },
];

export default function TemplateSelector({ template, setTemplate }) {
  return (
    <div role="radiogroup" aria-label="Resume templates" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {templates.map((tpl) => {
        const isSelected = template === tpl.id;

        return (
          <button
            key={tpl.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setTemplate(tpl.id)}
            className="text-left rounded-lg border-2 p-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              borderColor: isSelected ? ACCENT : LINE,
              backgroundColor: '#FFFFFF',
            }}
          >
            <div className="flex items-start gap-6">
              {/* Mini document preview */}
              <div
                className="w-28 h-36 flex-shrink-0 overflow-hidden rounded-md border bg-white"
                style={{ borderColor: LINE }}
              >
                <img
                  src={tpl.preview}
                  alt={`${tpl.name} resume template preview`}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-base" style={{ color: INK }}>
                    {tpl.name}
                  </h4>
                  <span
                    className="flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: isSelected ? ACCENT : LINE }}
                  >
                    {isSelected && <CheckCircle2 className="w-5 h-5" style={{ color: ACCENT }} />}
                  </span>
                </div>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: MUTED }}>
                  {tpl.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}