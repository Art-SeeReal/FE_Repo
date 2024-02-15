import styled from 'styled-components';

const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

interface Props {
  $center?: boolean;
  $bold?: boolean;
  $size?: keyof typeof SIZES;
}

export const Title = styled.h1<Props>`
  margin-bottom: 1em;

  ${({ $center }) => $center && `text-align: center`};
  ${({ $bold }) => $bold && `font-weight: 700`};

  font-size: ${({ $size }) => {
    if ($size === SIZES.small) {
      return `var(--title-3)`;
    }
    if ($size === SIZES.medium) {
      return `var(--title-2)`;
    }
    if ($size === SIZES.large) {
      return `var(--title-1)`;
    }

    return null;
  }};
`;

Title.defaultProps = {
  $size: SIZES.medium,
  $bold: true,
};
