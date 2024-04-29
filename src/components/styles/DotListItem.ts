import styled from 'styled-components';

export const DotListItem = styled.li`
  font-size: var(--text-body-1);
  padding-left: 0.75em;
  line-height: 1.5;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0.4375em;
    left: 0;
    width: 0.25em;
    height: 0.25em;
    border-radius: 50%;
    background-color: var(--color-secondary);
  }
`;
