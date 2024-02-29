import styled from 'styled-components';

interface Props {
  $maxHeight?: string;
}

export const ScrollableContainer = styled.div<Props>`
  max-height: ${({ $maxHeight }) => $maxHeight || '250px'};
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: 1px solid black;
  padding: 10px;
  margin-bottom: 20px;
`;
