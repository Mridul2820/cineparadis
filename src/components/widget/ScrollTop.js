import React, { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const ScrollTop = () => {
  const [showTop, setShowTop] = useState(false);

  const showScrollButton = () => {
    if (window.scrollY >= 50) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  };

  window.addEventListener('scroll', showScrollButton);

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-5 -right-full opacity-0 bg-blue-600 text-white p-2 rounded-md cursor-pointer duration-500 shadow-md hover:shadow-xl
        ${showTop && 'opacity-100 right-8'}`}
    >
      <IoIosArrowUp size="24px" />
    </div>
  );
};

export default ScrollTop;
