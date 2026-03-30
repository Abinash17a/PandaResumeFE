import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Type } from 'lucide-react';

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  placeholder = 'Start typing...',
  className = '',
  rows = 4 
}) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef(null);

  const detectFormatting = () => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
        ? range.commonAncestorContainer.parentElement 
        : range.commonAncestorContainer;
      
      if (parentElement) {
        setIsBold(parentElement.tagName === 'B' || parentElement.tagName === 'STRONG');
        setIsItalic(parentElement.tagName === 'I' || parentElement.tagName === 'EM');
        setIsUnderline(parentElement.tagName === 'U');
      }
    }
  };

  // Helper function to place cursor at end
  const placeCaretAtEnd = (el) => {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  };

  // Initialize content on mount
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || `<span class="text-gray-400">${placeholder}</span>`;
      
      // Update char count asynchronously
      setTimeout(() => {
        const textContent = (value || '').replace(/<[^>]*>/g, '');
        setCharCount(textContent.length);
      }, 0);
    }
  }, [value, placeholder]); // Only run on mount

  // Initialize content and detect formatting
  useEffect(() => {
    if (editorRef.current) {
      const currentValue = editorRef.current.innerHTML;
      
      // Only update if the value actually changed and editor is not focused
      if (value !== currentValue && document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || `<span class="text-gray-400">${placeholder}</span>`;
        
        // Update char count asynchronously to avoid cascading renders
        setTimeout(() => {
          const textContent = (value || '').replace(/<[^>]*>/g, '');
          setCharCount(textContent.length);
        }, 0);
      }
    }
  }, [value, placeholder]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    detectFormatting();
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const textContent = content.replace(/<[^>]*>/g, '');
      setCharCount(textContent.length);
      onChange(content);
    }
  };

  const handleKeyDown = (e) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      execCommand('insertText', '\t');
    }
    
    // Handle enter key for consistent formatting
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
          ? range.commonAncestorContainer.parentElement 
          : range.commonAncestorContainer;
        
        // If we're in a list, let browser handle it
        if (parentElement && ['LI', 'UL', 'OL'].includes(parentElement.tagName)) {
          return;
        }
        
        // Otherwise, insert a line break
        e.preventDefault();
        execCommand('insertLineBreak');
      }
    }
  };

  const insertList = (ordered = false) => {
    const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
    execCommand(command);
  };

  const clearFormatting = () => {
    execCommand('removeFormat');
    execCommand('unlink'); // Remove any links
  };

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          {/* Bold */}
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className={`p-2 rounded transition-colors ${
              isBold 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className={`p-2 rounded transition-colors ${
              isItalic 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className={`p-2 rounded transition-colors ${
              isUnderline 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            title="Underline (Ctrl+U)"
          >
            <Underline size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <div className="flex items-center gap-1">
          {/* Bullet List */}
          <button
            type="button"
            onClick={() => insertList(false)}
            className="p-2 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            title="Bullet List"
          >
            <List size={16} />
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => insertList(true)}
            className="p-2 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <div className="flex items-center gap-1">
          {/* Clear Formatting */}
          <button
            type="button"
            onClick={clearFormatting}
            className="p-2 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            title="Clear Formatting"
          >
            <Type size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        onMouseUp={detectFormatting}
        onKeyUp={detectFormatting}
        className="min-h-25 p-4 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-gray-900 text-sm"
        style={{ minHeight: `${rows * 25}px` }}
        onFocus={(e) => {
          // Clear placeholder on focus if it's the only content
          if (e.target.innerHTML === `<span class="text-gray-400">${placeholder}</span>`) {
            e.target.innerHTML = '';
            placeCaretAtEnd(e.target);
          }
        }}
        onBlur={(e) => {
          // Add placeholder back if empty
          if (!e.target.innerHTML.trim()) {
            e.target.innerHTML = `<span class="text-gray-400">${placeholder}</span>`;
          }
        }}
      />

      {/* Character count */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        {charCount} characters
      </div>
    </div>
  );
};

export default RichTextEditor;
