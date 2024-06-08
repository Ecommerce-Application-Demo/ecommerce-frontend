import React, { useEffect, useRef, useState } from 'react';

const StickyBox = ({ children, offsetTop = 0 }) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && placeholderRef.current) {
        const scrollTop = window.scrollY;
        const placeholderRect = placeholderRef.current.getBoundingClientRect();
        const stickyStart = placeholderRect.top + scrollTop - offsetTop;
        const isNowSticky = scrollTop > stickyStart;

        setIsSticky(isNowSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offsetTop]);

  return (
    <div ref={placeholderRef} style={{ position: 'relative' }}>
      <div
        ref={ref}
        style={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? `${offsetTop}px` : 'initial',
          zIndex: isSticky ? 10 : 'initial',
          width: isSticky ? placeholderRef.current?.offsetWidth : '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default StickyBox;
