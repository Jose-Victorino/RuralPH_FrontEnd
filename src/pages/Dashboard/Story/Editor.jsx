import { useEffect, useRef } from 'react'
import ReactQuill, { Quill } from 'react-quill-new'
import { MentionBlot, Mention } from 'quill-mention'

import 'quill-mention/dist/quill.mention.css'

class HashtagBlot extends MentionBlot {
  static render(data) {
    const node = document.createElement('a')
    node.href = `/story?tag=${data.value}`
    node.textContent = `#${data.value}`
    return node
  }
}
Quill.register({ 'blots/mention': HashtagBlot, 'modules/mention': Mention })

const HASHTAG_SUGGESTIONS = ['capecod', 'atcaperod']

const FONTS = ['lato', 'arial', 'times-new-roman', 'serif', 'monospace']
const Font = Quill.import('formats/font')
// @ts-ignore
Font.whitelist = FONTS
// @ts-ignore
Quill.register(Font, true)

const undo = function () {
  this.quill.history.undo()
}

const redo = function () {
  this.quill.history.redo()
}

const modules = {
  toolbar: {
    container: [
      ['undo', 'redo'],
      [{ font: FONTS }],
      ['bold', 'italic', 'underline', { script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ],
    handlers: {
      undo,
      redo,
    },
  },
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: true,
  },
  mention: {
    allowedChars: /^[a-zA-Z0-9_]*$/,
    mentionDenotationChars: ['#'],
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
    renderItem: ({ value }) => `#${value}`,
    showDenotationChar: false,
  },
  keyboard: {
    bindings: {
      undo: {
        key: 'z',
        shortKey: true,
        handler: function () {
          this.quill.history.undo()
        },
      },
      redo: {
        key: 'z',
        shortKey: true,
        shiftKey: true,
        handler: function () {
          this.quill.history.redo()
        },
      },
    },
  },
}

const formats = [
  'font',
  'bold', 'italic', 'underline', 'script',
  'color', 'background',
  'align', 'list', 'indent',
  'mention',
]

const extractHashtags = (editor) => {
  const ops = editor.getContents().ops
  const seen = new Set()

  return ops
    .filter(op => op.insert?.mention !== undefined)
    .map(op => op.insert.mention.value)
    .filter(tag => {
      if(seen.has(tag)) return false
      seen.add(tag)
      return true
    })
}

function RichTextEditor({ value, onChange, editorKey }) {
  const quillRef = useRef(null)

  useEffect(() => {
    const editor = quillRef.current?.getEditor()
    if(!editor) return
    editor.clipboard.dangerouslyPasteHTML(value.html ?? '')
  }, [editorKey])

  const handleChange = (_, __, ___, editor) => {
    onChange({
      html: editor.getHTML(),
      hashtags: extractHashtags(editor)
    })
  }

  return (
    <ReactQuill
      ref={quillRef}
      theme='snow'
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  )
}

export default RichTextEditor