import React, { useEffect, useState, useRef } from "react";

const CustomHeadroom = ({ children }) => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useRef(() => {
    const currentScrollY = window.scrollY;
    console.log('handleScroll', currentScrollY, lastScrollY.current);
    if (currentScrollY < lastScrollY.current) {
      setShow(true); // Show on scroll up
    } else {
      setShow(false); // Hide on scroll down
    }
    lastScrollY.current = currentScrollY;
  });

  useEffect(() => {
    const onScroll = () => handleScroll.current();
    console.log('useeffect');
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  console.log('CustomHeadroom rendered');
  return (
    <div className={`headroom ${show ? "headroom--pinned" : "headroom--unpinned"}`}>
      {children}
    </div>
  );
};

export default CustomHeadroom;
