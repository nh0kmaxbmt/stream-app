import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mt-5 overflow-hidden flex items-center text-sm text-white px-4 py-2 mb-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="bg-blue-900 px-3 py-1 rounded-md shadow-md font-medium tracking-wide transition-all duration-300 hover:bg-blue-800 hover:font-bold hover:scale-110">
            {item.href ? (
              <a href={item.href}>
                {item.label}
              </a>
            ) : (
              <span className="font-bold">{item.label}</span>
            )}
          </div>
          {index < items.length - 1 && <ChevronRight />}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
