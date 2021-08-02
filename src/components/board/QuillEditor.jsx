import React from 'react';
import ReactQuill from 'react-quill';

const QuillEditor = (props) => {
  // const { quill, quillRef } = useQuill();
  const { id, value, theme } = props;
  const modules = {
    toolbar: [
      // [{ header: [1, 2, false] }],
      // ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      // [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      // ['link', 'image'],
      // [{ align: [] }, { color: [] }, { background: [] }],
      // ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background'
  ];

  const onEditorChange = (content, delta, source, editor) => {
    // editor.enable(false);
    console.log(1234);
    console.log(theme);
    // editor.getContents();
  };

  return (
    <ReactQuill
      id={id}
      theme={theme}
      modules={modules}
      formats={formats}
      value={value || ''}
      onEditorChange={onEditorChange}
    />
  );
};

export default QuillEditor;