import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ResizeImageExtension from "./ResizableImageExtension";
import AlignmentExtension from "./AlignmentExtension";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isToolbarSticky, setIsToolbarSticky] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const toolbarRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Restore useEditor as a direct hook call (not inside useMemo)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");
            if (disallowedProtocols.includes(protocol)) {
              return false;
            }
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );
            if (!allowedProtocols.includes(protocol)) {
              return false;
            }
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;
            if (disallowedDomains.includes(domain)) {
              return false;
            }
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;
            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      // ResizeImageExtension,
      AlignmentExtension,
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // If content changes externally, update the editor
  // Only update content if not focused and content is different
  useEffect(() => {
    if (editor && content) {
      if (editor.getHTML() !== content && !editor.isFocused) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  // Add scroll event listener for sticky toolbar
  useEffect(() => {
    const handleScroll = () => {
      if (!toolbarRef.current || !editorRef.current) return;

      const editorRect = editorRef.current.getBoundingClientRect();

      // Make toolbar sticky when editor top goes out of view
      if (editorRect.top < 0 && !isToolbarSticky) {
        setIsToolbarSticky(true);
      } else if (editorRect.top >= 0 && isToolbarSticky) {
        setIsToolbarSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isToolbarSticky]);

  if (!editor) {
    return null;
  }

  const addImage = async (): Promise<void> => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        // Get base URL from environment variable
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Fallback if env var is not set
        const uploadUrl = `${apiUrl}/login/upload-image`;

        // If you need authentication, add the Authorization header
        const token = localStorage.getItem("auth_token");
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: token ? { token } : undefined,
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Image upload failed");
        }

        const data = await response.json();
        if (data?.imageUrl) {
          // Prepend the base URL if the backend returns a relative path
          const fullImageUrl = data.imageUrl.startsWith("/")
            ? `${apiUrl}${data.imageUrl}`
            : data.imageUrl;

          // Insert the image
          editor
            .chain()
            .focus()
            .setImage({ src: fullImageUrl })
            .createParagraphNear()
            .run();
        }
      } catch (error: any) {
        console.error("Failed to upload image:", error);
        alert("Failed to upload image: " + error.message);
      } finally {
        setSelectedFile(null);
        const fileInput = document.getElementById(
          "image-upload"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  function handleLinkButton() {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkValue(previousUrl);
    setShowLinkInput(true);
  }

  function handleLinkSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;
    if (linkValue === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkValue }).run();
    }
    setShowLinkInput(false);
  }

  function handleLinkCancel() {
    setShowLinkInput(false);
  }

  // Check if current text has specific alignment
  const isAlignActive = (alignment: string): boolean => {
    if (!editor) return false;

    // Use the editor's built-in active state checking
    const attrs = { textAlign: alignment };

    // Check if any of these node types have the alignment applied
    return (
      editor.isActive("paragraph", attrs) ||
      editor.isActive("heading", attrs) ||
      editor.isActive("blockquote", attrs) ||
      editor.isActive("listItem", attrs)
    );
  };

  // Extended chain type to allow our custom commands
  type EditorChain = ReturnType<typeof editor.chain> & {
    setTextAlign: (alignment: string) => any;
  };

  return (
    <div className="rich-text-editor" ref={editorRef}>
      <div
        className={`editor-toolbar ${isToolbarSticky ? "sticky" : ""}`}
        ref={toolbarRef}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          type="button"
          title="Bold"
        >
          <span style={{ fontWeight: "bold" }}>B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          type="button"
          title="Italic"
        >
          <span style={{ fontStyle: "italic" }}>I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          type="button"
          title="Strikethrough"
        >
          <span style={{ textDecoration: "line-through" }}>S</span>
        </button>{" "}
        <button
          type="button"
          onClick={handleLinkButton}
          className={editor.isActive("link") ? "is-active" : ""}
          aria-label="Add/Edit Link"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
        {showLinkInput && (
          <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
            <input
              type="text"
              value={linkValue}
              onChange={e => setLinkValue(e.target.value)}
              placeholder="Enter URL"
              autoFocus
              style={{ flex: 1 }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLinkSubmit(e as any);
                }
              }}
            />
            <button type="button" onClick={handleLinkSubmit}>OK</button>
            <button type="button" onClick={handleLinkCancel}>Cancel</button>
          </div>
        )}
        {/* Text alignment buttons */}
        <div className="separator"></div>
        <button
          onClick={() =>
            (editor.chain() as EditorChain).focus().setTextAlign("left").run()
          }
          className={`align-button ${isAlignActive("left") ? "is-active" : ""}`}
          type="button"
          title="Align Left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z" />
          </svg>
        </button>
        <button
          onClick={() =>
            (editor.chain() as EditorChain).focus().setTextAlign("center").run()
          }
          className={`align-button ${
            isAlignActive("center") ? "is-active" : ""
          }`}
          type="button"
          title="Align Center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5h8v2H8zm-5 4h18v2H3zm5 4h8v2H8zm-5 4h18v2H3z" />
          </svg>
        </button>
        <button
          onClick={() =>
            (editor.chain() as EditorChain).focus().setTextAlign("right").run()
          }
          className={`align-button ${
            isAlignActive("right") ? "is-active" : ""
          }`}
          type="button"
          title="Align Right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5h18v2H3zm6 4h12v2H9zm-6 4h18v2H3zm6 4h12v2H9z" />
          </svg>
        </button>
        <button
          onClick={() =>
            (editor.chain() as EditorChain)
              .focus()
              .setTextAlign("justify")
              .run()
          }
          className={`align-button ${
            isAlignActive("justify") ? "is-active" : ""
          }`}
          type="button"
          title="Justify"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
          </svg>
        </button>
        <div className="separator"></div>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
          type="button"
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
          type="button"
          title="Heading 3"
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          type="button"
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          type="button"
          title="Numbered List"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
          type="button"
          title="Code Block"
        >
          {"</>"}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
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
      <EditorContent
        editor={editor}
        className={`editor-content ${
          isToolbarSticky ? "has-sticky-toolbar" : ""
        }`}
      />
    </div>
  );
};

export default RichTextEditor;
