import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mobileNavState } from '../../recoil/atoms/mobileNavState';

export const useMobileNavState = () => {
  const [mobileNav, setMobileNav] = useRecoilState(mobileNavState);
  const { isOpen } = mobileNav;
  const toggleNav = () => {
    setMobileNav((prev) => ({ isOpen: !prev.isOpen }));
  };

  const location = useLocation();

  const closeNav = () => {
    setMobileNav(() => ({ isOpen: false }));
  };

  useEffect(() => {
    closeNav();
  }, [location]);
  return {
    isOpen,
    toggleNav,
  };
};
