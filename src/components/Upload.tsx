import React, { ChangeEvent, useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useUpload } from '../hooks/useUtilQuery';
import Thumbnail from './Thumbnail';
import FileInfo from './FileInfo';
import * as S from './styles';
import { formContext, FormHookReturns } from '../hooks/useFormState';
import { isEmptyObject } from '../utils/utils';

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
  useThumbnail?: boolean;
  onSuccess?: (name: string, fileUrl: string) => void;
}

const Upload = ({ id, name, accept, useThumbnail, onSuccess }: Props) => {
  const formValue = useContext(formContext) as FormHookReturns;
  const hasFormValue = !isEmptyObject(formValue);

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

    if (onSuccess) onSuccess(name, data.data.fileUrl);

    if (hasFormValue) formValue.setFormValues(name, data.data.fileUrl);
  }, [isSuccess]);

  useEffect(() => {
    if (hasFormValue && isSuccess) formValue.setFormValues(name, ''); // 리셋
  }, [file]);

  return (
    <>
      <input
        ref={fileRef}
        id={id}
        className="hidden"
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />

      {useThumbnail && <Thumbnail imageUrl={fileInfo.fileUrl} onClick={triggerFileSearch} />}

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
