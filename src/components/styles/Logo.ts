import styled from 'styled-components';
import logoImg from '../../assets/images/logo.svg';

interface Props {
  $width?: string;
  $grayscale?: boolean;
}

const Logo = styled.img<Props>`
  width: ${({ $width }) => ($width ? `${$width}` : `8rem`)};
  height: auto;

  ${({ $grayscale }) => $grayscale && `filter: grayscale(100%)`};
`;

Logo.defaultProps = {
  src: logoImg,
  alt: 'Art-SeeReal Logo',
};

export default Logo;
