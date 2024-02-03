import styled from 'styled-components';

interface Props {
  $error?: boolean;
}

const Label = styled.label<Props>`
  color: ${({ $error }) => ($error ? `var(--color-error)` : `var(--color-secondary)`)};
  font-size: 1.6rem;
`;

export default Label;
