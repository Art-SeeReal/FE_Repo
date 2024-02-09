import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button, { Props, defaultProps } from './Button';

interface RouterProps extends Props {
  to: string;
}

const ButtonRouter = styled(Link)<RouterProps>`
  ${Button.componentStyle.rules}
`;

ButtonRouter.defaultProps = defaultProps;

export default ButtonRouter;
