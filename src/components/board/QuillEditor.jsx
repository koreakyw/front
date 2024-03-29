import React from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const QuillEditor = (props) => {
  // const { quill, quillRef } = useQuill();
  const { id, value, theme, modules, readOnly } = props;

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  //     ['link', 'image'],
  //     [{ align: [] }, { color: [] }, { background: [] }],
  //     ['clean']
  //   ]
  // };

  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image',
  //   'align', 'color', 'background'
  // ];

  const onEditorChange = (content, delta, source, editor) => {
    const value = JSON.stringify(editor.getContents());
    const targetId = id;
    const obj = {
      [targetId]: value
    };
    const condition = {
      ...obj,
      id: id,
      value: value,
      text: content,
      editor
    };
    if (props.onChange) props.onChange(condition);
  };

  return (
    <ReactQuill
      id={id}
      theme={theme}
      modules={modules}
      // formats={formats}
      value={value}
      onChange={onEditorChange}
      readOnly={readOnly}
    />
  );
};

export default QuillEditor;