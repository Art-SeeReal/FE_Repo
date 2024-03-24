import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useUpload } from '../hooks/query/useUtilQuery';
import Thumbnail from './Thumbnail';
import FileInfo from './FileInfo';
import * as S from './styles';

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

interface Props {
  id: string;
  name: string;
  accept?: string;
  thumbnailMode?: boolean;
  onSuccess?: (value: string) => void;
  onReset?: () => void;
}

const Upload = ({ id, name, accept, thumbnailMode, onSuccess, onReset }: Props) => {
  const [file, setFile] = useState<File>(); // 바이너리 파일
  const [fileInfo, setFileInfo] = useState({ fileUrl: '', fileName: '' });
  const [isStaging, setIsStaging] = useState(false); // 파일 서버 업로드 대기 상태

  const fileRef = useRef<HTMLInputElement>(null);

  const { mutate: upload, data, isSuccess } = useUpload();

  const triggerFileSearch = () => fileRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadFile = e.target.files[0];
    setFile(uploadFile);

    setIsStaging(!!uploadFile);

    const fileUrl = uploadFile ? URL.createObjectURL(uploadFile) : '';
    const fileName = uploadFile?.name || '';
    setFileInfo({ fileUrl, fileName });
  };

  const fileUpload = () => {
    if (!file) return;

    upload(file);
  };

  useEffect(() => {
    if (!isSuccess) return;

    setIsStaging(false);

    if (onSuccess) onSuccess(data.data.fileUrl);
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess && onReset) {
      onReset();
    }
  }, [file]);

  return (
    <>
      <input
        ref={fileRef}
        id={id}
        className="hidden"
        type="file"
        name={name}
        accept={thumbnailMode && !accept ? 'image/*' : accept}
        onChange={handleFileChange}
      />

      {thumbnailMode && <Thumbnail imageUrl={fileInfo.fileUrl} onClick={triggerFileSearch} />}

      {fileInfo.fileName && <FileInfo data={fileInfo} isUploaded={isSuccess && !isStaging} />}

      <StyledButtons>
        <S.Button $size="small" $style="secondary" onClick={triggerFileSearch}>
          파일찾기
        </S.Button>
        <S.Button $size="small" onClick={fileUpload} disabled={!isStaging}>
          서버 업로드
        </S.Button>
      </StyledButtons>
    </>
  );
};

export default Upload;
