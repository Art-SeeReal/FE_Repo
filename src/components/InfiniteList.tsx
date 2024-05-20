import React, { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from './Loading';

interface Props {
  children: ReactNode;
  onLoadMore: () => void;
  isLoading: boolean;
  isFetching: boolean;
}

const InfiniteList = ({ children, onLoadMore, isLoading, isFetching }: Props) => {
  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (!inView) return;

    onLoadMore();
  }, [inView]);

  return (
    <>
      {isLoading ? <Loading /> : children}
      <div ref={ref}>{!isLoading && isFetching && <Loading />}</div>
    </>
  );
};

export default InfiniteList;
