import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"

const modules = {
  toolbar: [
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    // [{font: []}],
    // [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
    [
      {list: 'bullet'},
      {list: 'ordered'},
      {indent: "+1"},
      {indent: "-1"},
    ],
  ]
}
// dangerousSetInnerHTML={{ __html: value }}
const RichTextEditor = ({value, setValue}) => {

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={() => setValue(e.target.value)}
      modules={modules}
    />
  )
}

export default RichTextEditor