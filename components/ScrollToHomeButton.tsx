import React, { useState, useEffect } from 'react';

const ScrollToHomeButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;

    if (scrollPercentage > 5) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer font-semibold text-xs fixed bottom-4 right-4 bg-blue-500 p-3 rounded-xl transition-opacity duration-500 bg-gradient-to-r from-purple-500 to-indigo-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      TOP
    </button>
  )
};

export default ScrollToHomeButton;
