import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { getPresignedUrl, uploadS3 } from '../api/utils';

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
  const quillRef = useRef<ReactQuill>(null);

  const toolbarOptions = [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ];

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.click();

    input.addEventListener('change', async () => {
      const file = input.files && input.files[0];
      if (file) {
        const responseRresignedUrl = await getPresignedUrl(file);
        const { presignedUrl } = responseRresignedUrl.data;
        const responseS3Url = await uploadS3(presignedUrl, file);
        const { s3Url } = responseS3Url.data;
        const editor = quillRef && quillRef?.current?.getEditor();
        const range = editor?.getSelection();
        const index = range?.index ?? 0;
        editor?.insertEmbed(index, 'image', s3Url);
        editor?.setSelection(index + 1, 1);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: { image: imageHandler },
      },
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
        ref={quillRef} // Ref를 컴포넌트에 연결
        modules={modules}
        formats={formats}
        theme="snow"
        value={content}
        onBlur={onBlur}
        onChange={onChange}
        placeholder="내용을 입력해주세요."
      />
    </StyledEditorContainer>
  );
};

ReactQuillForm.defaultProps = {
  width: '100%',
  height: '400px',
};

export default ReactQuillForm;
