import ReactQuill, { Quill } from 'react-quill-new'
import { MentionBlot, Mention } from 'quill-mention'
import { useRef } from 'react';

import "quill-mention/dist/quill.mention.css"

Quill.register({ "blots/mention": MentionBlot, "modules/mention": Mention })

const HASHTAG_SUGGESTIONS = ["capecod", "atcaperod"]

const modules = {
  toolbar: [
    [{ header: [false, 1, 2, 3, 4] }],
    // [{ font: [] }],
    // [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", { script: "sub" }, { script: "super" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    // ["blockquote", "code-block"],
    // ["link", "image", "video"],
  ],
  mention: {
    allowedChars: /^[a-zA-Z0-9_]*$/,
    mentionDenotationChars: ["#"],
    source(searchTerm, renderList){
      const term = searchTerm.toLowerCase()
      const matches = HASHTAG_SUGGESTIONS
        .filter(tag => tag.toLowerCase().includes(term))
        .map(tag => ({ value: tag }))

      if(searchTerm.trim().length > 0){
        const alreadyExists = matches.some(h => h.value.toLowerCase() === term)
        if(!alreadyExists) matches.push({ value: searchTerm })
      }

      renderList(matches, searchTerm)
    },
    renderItem: ({ value }) => `<a href='/story${value}'>#${value}</a>`,
    showDenotationChar: true,
  },
}

const formats = [
  "header",
  // "font",
  // "size",
  "bold", "italic", "underline",
  "strike", "script",
  "color", "background",
  "align", "list", "indent",
  // "blockquote", "code-block",
  // "link", "image", "video",
  "mention",
]

function RichTextEditor({ value, onChange }) {
  const quillRef = useRef(null)

  const extractHashtags = (quill) => {
    const seen = new Set()
    return quill.getContents().ops
      .filter(op => op.insert?.mention?.denotationChar === "#")
      .map(op => op.insert.mention.value)
      .filter(tag => {
        if(seen.has(tag)) return false
        seen.add(tag)
        return true
      })
  }

  const handleChange = (html, delta, source, editor) => {
    const quill = quillRef.current?.getEditor()
    if(!quill) return

    onChange?.({
      html: quill.root.innerHTML,
      hashtags: extractHashtags(quill)
    })
  }

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      defaultValue={value.html}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder='Enter text...'
    />
  )
}

export default RichTextEditor