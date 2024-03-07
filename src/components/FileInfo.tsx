import React from 'react';
import styled from 'styled-components';
import { RiFileImageLine, RiCheckboxCircleLine } from '@remixicon/react';

const StyledFileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--text-body-2);
`;

interface Props {
  data: { fileName: string; fileUrl: string };
  isUploaded?: boolean;
}

const FileInfo = ({ data, isUploaded }: Props) => {
  return (
    <StyledFileInfo>
      <RiFileImageLine /> {data.fileName} {isUploaded && <RiCheckboxCircleLine className="color-success" />}
    </StyledFileInfo>
  );
};

FileInfo.defaultProps = {
  isUploaded: false,
};

export default FileInfo;
