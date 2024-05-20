import React, { useState } from 'react';
import styled from 'styled-components';
import * as S from './styles';

const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

interface TabsProps {
  tabTitles: string[];
  tabContents: React.ReactNode[];
  $divider?: boolean;
  $size?: 'small' | 'medium' | 'large';
}

const TabButton = styled.button<{ $isActive: boolean; $size: string }>`
  padding: 10px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${({ $isActive }) => ($isActive ? 'black' : 'lightgray')};
  border-bottom: ${({ $isActive }) => ($isActive ? '2px solid #e58ae6' : 'none')};

  ${({ $size }) => {
    if ($size === SIZES.small) {
      return `
        font-size: var(--text-body-2);
      `;
    }
    if ($size === SIZES.medium) {
      return `
        font-size: var(--sub-title-4);
      `;
    }
    if ($size === SIZES.large) {
      return `
        font-size: var(--sub-title-3);
      `;
    }
    return '';
  }}

  &:hover {
    border-bottom: 2px solid #e58ae6;
  }

  &:focus {
    outline: none;
  }
`;

const TabsMenuContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  font-size: var(--sub-title-3);
`;

const Tabs = ({ tabTitles, tabContents, $divider, $size = 'large' }: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <S.Container>
      <S.Row>
        <TabsMenuContainer>
          {tabTitles.map((tabTitle, index) => (
            <TabButton
              key={tabTitle}
              onClick={() => handleTabClick(index)}
              $isActive={index === activeTabIndex}
              $size={$size}
            >
              {tabTitle}
            </TabButton>
          ))}
        </TabsMenuContainer>
      </S.Row>
      {$divider && <S.Divider />}
      {tabContents[activeTabIndex]}
    </S.Container>
  );
};

export default Tabs;
