import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const StyledEditorContainer = styled.div<{ $width?: string; $height?: string }>`
  .quill {
    ${({ $width }) => $width && `max-width: ${$width}`}
  }

  .ql-toolbar {
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
  }

  .ql-container {
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;

    ${({ $height }) => $height && `height: ${$height}`}
  }
`;

interface ReactQuillFormProps {
  width?: string;
  height?: string;
  content: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
}

const ReactQuillForm: React.FC<ReactQuillFormProps> = ({ width, height, content, onBlur, onChange }) => {
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

  const formats = useMemo(
    () => [
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
    ],
    [],
  );

  return (
    <StyledEditorContainer $width={width} $height={height}>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        value={content}
        onBlur={onBlur}
        onChange={onChange}
      />
    </StyledEditorContainer>
  );
};

ReactQuillForm.defaultProps = {
  width: '100%',
  height: '400px',
};

export default ReactQuillForm;
