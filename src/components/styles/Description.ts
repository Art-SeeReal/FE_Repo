import styled from 'styled-components';

const SIZES = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'medium',
} as const;

interface Props {
  $size?: (typeof SIZES)[keyof typeof SIZES];
}

export const Description = styled.p<Props>`
  font-size: ${({ $size }) => {
    if ($size === SIZES.xsmall) {
      return `var(--text-caption);`;
    }

    if ($size === SIZES.small) {
      return `var(--text-body-2);`;
    }

    return `var(--text-body-1);`;
  }};
`;

Description.defaultProps = {
  $size: SIZES.medium,
};
