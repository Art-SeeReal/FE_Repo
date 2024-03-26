import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.span`
  font-size: var(--sub-title-3);
  font-weight: 700;
  cursor: pointer;

  .is-active {
    text-decoration: underline;
  }
`;

const StyeldGnb = styled.ul`
  display: flex;
  gap: 4rem;

  &.is-membership {
    ${StyledMenu} {
      color: var(--color-secondary);
    }
  }
`;

interface Props {
  data: { id: number; to?: string; name: string; onClick?: () => void }[];
  membership?: boolean;
}

const HeaderNavGnb = ({ data, membership }: Props) => {
  return (
    <StyeldGnb className={membership ? 'is-membership' : ''}>
      {data.map(({ id, to, name, onClick }) => (
        <li key={id}>
          <StyledMenu onClick={onClick}>
            {to ? (
              <NavLink to={to} className={({ isActive }: { isActive: boolean }) => (isActive ? 'is-active' : '')}>
                {name}
              </NavLink>
            ) : (
              name
            )}
          </StyledMenu>
        </li>
      ))}
    </StyeldGnb>
  );
};

export default HeaderNavGnb;
