// /Users/vincent/Downloads/website/jgvnew/components/RightSidebar.tsx
import React, { useState } from 'react';

type RightSidebarProps = {
  sidebarContent: React.ReactNode;
};

const RightSidebar: React.FC<RightSidebarProps> = ({ sidebarContent }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <div className="relative">
      <div className={`w-full md:w-1/4 bg-gray-100 p-4 ${!isSidebarVisible ? 'hidden' : ''}`}>
        {sidebarContent}
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-full z-10"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isSidebarVisible ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default RightSidebar;