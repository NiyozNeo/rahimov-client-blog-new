import { Extension } from '@tiptap/core';
// Remove unused Editor import
// import { Editor } from '@tiptap/react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    alignment: {
      /**
       * Set the text alignment
       */
      setTextAlign: (alignment: string) => ReturnType;
      /**
       * Unset the text alignment
       */
      unsetTextAlign: () => ReturnType;
    }
  }
}

const AlignmentExtension = Extension.create({
  name: 'alignment',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          textAlign: {
            default: 'left',
            renderHTML: (attributes: { textAlign?: string }) => {
              if (!attributes.textAlign || attributes.textAlign === 'left') {
                return {};
              }

              return {
                style: `text-align: ${attributes.textAlign}`,
              };
            },
            parseHTML: (element: HTMLElement) => {
              const textAlign = element.style.textAlign;
              if (!textAlign || textAlign === 'left') {
                return 'left';
              }
              return textAlign;
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextAlign: (alignment: string) => ({ commands }: { commands: any }) => {
        return commands.forEach(['paragraph', 'heading'], (node: string) => {
          return commands.updateAttributes(node, { textAlign: alignment });
        });
      },
      unsetTextAlign: () => ({ commands }: { commands: any }) => {
        return commands.forEach(['paragraph', 'heading'], (node: string) => {
          return commands.resetAttributes(node, 'textAlign');
        });
      },
    };
  },
});

export default AlignmentExtension;