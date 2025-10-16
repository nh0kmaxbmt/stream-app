"use client"
import React from 'react';

interface HashLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

// Utility function to scroll to element with offset
const scrollToHash = (hash: string, headerOffset: number): void => {
  const id = hash.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const HashLink: React.FC<HashLinkProps> = ({ children, href, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the browser's default jump

    // Update the URL hash without the default scrolling behavior
    window.history.pushState(null, '', href);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const headerOffset = rootFontSize * 5; // This gives you the pixel value for 5rem

    // Delay slightly to ensure any potential layout changes have settled
    setTimeout(() => {
      scrollToHash(href, headerOffset);
    }, 50);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default HashLink;
