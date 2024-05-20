import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  children: ReactNode;
  message: string;
}

const Container = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  margin-left: 10px;

  &:hover .tooltip {
    display: block;
  }
`;

const Content = styled.div`
  display: none;
  white-space: nowrap;
  position: absolute;
  top: 0%;
  left: 100%;
  z-index: 1;
  background-color: #333;
  color: #fff;
  padding: 3px 5px;
  border-radius: 4px;
`;

const Tooltip = ({ children, message }: TooltipProps) => {
  const handleCopyClick = () => {
    const tempElement = document.createElement('textarea');
    tempElement.value = message;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
  };

  return (
    <Container>
      {children}
      <Content className="tooltip" onClick={handleCopyClick}>
        {message}
      </Content>
    </Container>
  );
};

export default Tooltip;
