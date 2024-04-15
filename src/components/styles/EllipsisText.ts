import styled from 'styled-components';

interface Props {
  $line?: number;
}

export const EllipsisText = styled.p<Props>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $line }) => ($line ? `${$line}` : `2`)};
  font-size: var(--sub-title-3);
`;
