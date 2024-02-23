import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ReactQuillFormProps {
  width: string;
  height: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ReactQuillForm: React.FC<ReactQuillFormProps> = ({ width, height, content, setContent }) => {
  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    };
  }, []);

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <ReactQuill
      style={{ width, height, marginTop: '50px', marginBottom: '80px' }}
      modules={modules}
      formats={formats}
      theme="snow"
      value={content}
      onChange={handleChange}
    />
  );
};

export default ReactQuillForm;
