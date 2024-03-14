import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { RiArrowDropDownLine, RiArrowDropUpLine } from '@remixicon/react';
import * as S from './styles';

const StyledDropdown = styled.div`
  position: relative;
  cursor: pointer;

  .field-wrap {
    position: relative;
  }

  .icon-wrap {
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translate(0, -50%);
  }

  .content {
    position: absolute;
    z-index: 1;
    width: 100%;
    margin-top: 1.6rem;
    padding: 1em;
    border-radius: 0.8rem;
    border: 1px solid var(--color-border-2);
    background-color: #fff;
    box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
  }

  .menu-list {
    &.is-multiple {
      display: flex;
      gap: 1rem;
      justify-content: flex-start;
      flex-wrap: wrap;

      label {
        flex: 0 0 calc((100% / 4) - (((4 - 1) / 4) * 1rem));
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 3rem;
  }
`;

const StyledDropdownFieldWrap = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledDropdownField = styled(S.Field)`
  padding-right: 2em;
  cursor: pointer;
  user-select: none;

  + .icon-wrap .remixicon {
    color: var(--color-border-1);
  }

  &:focus {
    + .icon-wrap .remixicon {
      color: var(--color-primary);
    }
  }
`;

interface DropdownProps {
  label: string;
  contentWidth?: number;
  openedMenu: boolean;
  toggleMenu: () => void;
  children: ReactNode;
}

const Dropdown = ({ label: defaultLabel, contentWidth, openedMenu, toggleMenu, children }: DropdownProps) => {
  return (
    <StyledDropdown>
      <StyledDropdownFieldWrap onClick={toggleMenu}>
        <StyledDropdownField readOnly value={defaultLabel} $inline />
        <div className="icon-wrap">{openedMenu ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}</div>
      </StyledDropdownFieldWrap>

      {openedMenu && (
        <div className="content" style={{ maxWidth: contentWidth }}>
          {children}
        </div>
      )}
    </StyledDropdown>
  );
};

Dropdown.defaultProps = {
  contentWidth: 400,
};

export default Dropdown;
