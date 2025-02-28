"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BaseHeading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlock from "@tiptap/extension-code-block";
import { useEffect } from "react";
import ToolBar from "./toolbar";
import { mergeAttributes } from '@tiptap/core'

type Levels = 1 | 2 | 3

const classes: Record<Levels, string> = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
}

export default function RichTextEditor({ content, onChange }: { content: any; onChange: any }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BaseHeading.configure({ levels: [1, 2, 3] }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level)
          const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0]
      
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ]
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-secondary-bg p-1 rounded-md",
        },
      }),
      Highlight
    ],
    content: content || "",  // Initial content
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-lightprimary-bg text-lightprimary-text dark:bg-primary-bg dark:text-primary-text py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
