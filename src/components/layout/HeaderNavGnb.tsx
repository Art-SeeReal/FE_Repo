import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyeldGnb = styled.ul`
  display: flex;
  gap: 4rem;

  &.is-membership {
    a {
      color: var(--color-secondary);
    }
  }

  a {
    font-size: var(--sub-title-3);
    font-weight: 700;

    &.is-active {
      text-decoration: underline;
    }
  }
`;

interface Props {
  data: { id: number; to: string; name: string }[];
  membership?: boolean;
}

const HeaderNavGnb = ({ data, membership }: Props) => {
  return (
    <StyeldGnb className={membership ? 'is-membership' : ''}>
      {data.map(({ id, to, name }) => (
        <li key={id}>
          <NavLink to={to} className={({ isActive }: { isActive: boolean }) => (isActive ? 'is-active' : '')}>
            {name}
          </NavLink>
        </li>
      ))}
    </StyeldGnb>
  );
};

export default HeaderNavGnb;
