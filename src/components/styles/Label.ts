import styled from 'styled-components';

interface Props {
  $error?: boolean;
}

export const Label = styled.label<Props>`
  color: ${({ $error }) => ($error ? `var(--color-error)` : `var(--color-secondary)`)};
  font-size: 1.6rem;
`;
