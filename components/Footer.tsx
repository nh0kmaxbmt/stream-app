"use client";
import { useState } from "react";

export default function Footer() {
  const site_name = process.env.NEXT_PUBLIC_site_name;
  const navItems = [
    { name: "HOME", url: "" },
    { name: "ABOUT", url: "about" },
    { name: "PRIVACY", url: "privacy" },
    { name: "TERMS", url: "terms" },
    { name: "CONTACT US", url: "contactus" },
  ];
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  return (
    <footer className="flex bg-blue-900 text-white pt-2 shadow-md">
      {/* Mobile Menu Button (visible on small screens) */}
      <div className="md:hidden my-auto pl-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-semibold mx-auto focus:outline-none text-2xl custom-gradient-a"
        >
          MENU
        </button>
      </div>
      {/* Mobile Dropdown Menu (visible on small screens when isOpen is true) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center transition-opacity duration-300">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-5xl font-bold mb-8"
          >
            &times;
          </button>

          {/* Nav Items in a 2-column grid */}
          <div className="grid grid-cols-2 gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`/${item.url.toLowerCase()}`}
                className="text-xl font-bold text-white hover:text-purple-400 transition-colors text-center"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}{" "}
      <div className="max-w-4xl mx-auto text-center text-sm pb-2">
        <p>Made with ❤️</p>
        <p>
          &copy; 2024-{new Date().getFullYear()}{" "}
          <span className="font-semibold custom-gradient-b uppercase">
            {site_name}
          </span>
          . All rights reserved.
        </p>
      </div>
      <div className="hidden md:flex z-10">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={`/${item.url.toLowerCase()}`}
            className="my-auto group relative px-5 py-2 text-sm font-bold rounded-md transition-colors duration-300 hover:bg-blue-500 hover:shadow-md"
          >
            {item.name}
            <span className="absolute left-0 bottom-0 block h-1 w-full bg-gradient-to-r from-purple-400 via-indigo-500 to-cyan-500 rounded-full transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
          </a>
        ))}
      </div>
    </footer>
  );
}
