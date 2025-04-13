import React, { useState, useEffect, ChangeEvent } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import AlignmentExtension from './AlignmentExtension';
import './RichTextEditor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      AlignmentExtension,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // If content changes externally, update the editor
  useEffect(() => {
    if (editor && content) {
      // Only update if the content is different to prevent cursor jumps
      if (editor.getHTML() !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const addImage = (): void => {
    if (selectedFile) {
      // In a real application, you would upload the file to a server
      // and get back a URL. For now, we'll use a temporary URL.
      const url = URL.createObjectURL(selectedFile);
      editor.chain().focus().setImage({ src: url }).run();
      setSelectedFile(null);
      
      // Reset the file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Check if current text has specific alignment
  const isAlignActive = (alignment: string): boolean => {
    if (!editor) return false;
    
    // Use the editor's built-in active state checking
    const attrs: Record<string, string> = {};
    if (alignment !== 'left') {
      attrs.textAlign = alignment;
    }

    // Check if the node with these attributes is active
    return editor.isActive('paragraph', attrs) || editor.isActive('heading', attrs);
  };

  // Extended chain type to allow our custom commands
  type EditorChain = ReturnType<typeof editor.chain> & {
    setTextAlign: (alignment: string) => any;
  };

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          type="button"
          title="Bold"
        >
          <span style={{ fontWeight: 'bold' }}>B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          type="button"
          title="Italic"
        >
          <span style={{ fontStyle: 'italic' }}>I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          type="button"
          title="Strikethrough"
        >
          <span style={{ textDecoration: 'line-through' }}>S</span>
        </button>
        
        {/* Text alignment buttons - reduced to 3 options */}
        <div className="separator"></div>
        <button
          onClick={() => (editor.chain() as EditorChain).focus().setTextAlign('left').run()}
          className={`align-button ${isAlignActive('left') ? 'is-active' : ''}`}
          type="button"
          title="Align Left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z"/>
          </svg>
        </button>
        <button
          onClick={() => (editor.chain() as EditorChain).focus().setTextAlign('center').run()}
          className={`align-button ${isAlignActive('center') ? 'is-active' : ''}`}
          type="button"
          title="Align Center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5h8v2H8zm-5 4h18v2H3zm5 4h8v2H8zm-5 4h18v2H3z"/>
          </svg>
        </button>
        <button
          onClick={() => (editor.chain() as EditorChain).focus().setTextAlign('right').run()}
          className={`align-button ${isAlignActive('right') ? 'is-active' : ''}`}
          type="button"
          title="Align Right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5h18v2H3zm6 4h12v2H9zm-6 4h18v2H3zm6 4h12v2H9z"/>
          </svg>
        </button>
        <div className="separator"></div>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          type="button"
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          type="button"
          title="Heading 3"
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          type="button"
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          type="button"
          title="Numbered List"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          type="button"
          title="Code Block"
        >
          {'</>'}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          type="button"
          title="Quote"
        >
          "❞"
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          type="button"
          title="Horizontal Line"
        >
          —
        </button>
        
        <div className="image-upload">
          <input 
            type="file" 
            id="image-upload" 
            onChange={handleFileChange} 
            accept="image/*"
          />
          <label htmlFor="image-upload" className="upload-label">
            🖼️ Choose Image
          </label>
          {selectedFile && (
            <button 
              onClick={addImage} 
              type="button" 
              className="insert-image-btn"
            >
              Insert Image
            </button>
          )}
        </div>
      </div>
      
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default RichTextEditor;