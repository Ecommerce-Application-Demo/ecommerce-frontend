import { useState, useEffect } from 'react';

const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({
    isDesktopOrLaptop: false,
    isTablet: false,
    isMobile: false,
    isSmallMobile: false,
    isPortrait: false,
    isRetina: false,
  });

  useEffect(() => {
    const checkBreakpoints = () => {
      const isDesktopOrLaptop = window.matchMedia('(min-width: 1280px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
      const isSmallMobile = window.matchMedia('(max-width: 450px)').matches;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      const isRetina = window.matchMedia('(min-resolution: 2dppx)').matches;

      setBreakpoints({
        isDesktopOrLaptop,
        isTablet,
        isMobile,
        isSmallMobile,
        isPortrait,
        isRetina,
      });
    };

    checkBreakpoints();

    window.addEventListener('resize', checkBreakpoints);

    return () => window.removeEventListener('resize', checkBreakpoints);
  }, []);

  return breakpoints;
};

export default useBreakpoints;
