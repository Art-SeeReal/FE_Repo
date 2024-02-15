import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

const ArrowLookUpTable = {
  prev: RiArrowLeftSLine,
  next: RiArrowRightSLine,
} as const;

interface Props {
  className: string;
  direction: keyof typeof ArrowLookUpTable;
  size?: number;
  color?: string;
}

const SliderNavButton = ({ className, direction, size = 80, color = 'rgba(0, 0, 0, .4)' }: Props) => {
  return (
    <button className={className} type="button">
      {React.createElement(ArrowLookUpTable[direction], { direction, size, color })}
    </button>
  );
};

export default SliderNavButton;
