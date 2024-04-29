import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../styles';

const StyledMenu = styled.span`
  font-size: var(--sub-title-3);
  font-weight: 700;
  cursor: pointer;

  ${S.Media.mobile`
    font-size: var(--title-1);

    a {
     display: block; 
     padding: 2rem 4rem;
    }
  `}

  .is-active {
    text-decoration: underline;
  }
`;

const StyeldGnb = styled.ul`
  display: flex;
  gap: 4rem;

  ${S.Media.tablet`
    gap: 3rem;
  `}

  ${S.Media.mobile`
    flex-direction: column;
    gap: 0;
  `}

  &.is-membership {
    ${StyledMenu} {
      color: var(--color-secondary);
    }

    ${S.Media.mobile`
      margin-top: auto;

      a {
        font-size: var(--sub-title-1);
      }
    `}
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
