"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToHomeButton from "@/components/ScrollToHomeButton";
import {
  SideBarList,
  SideBarCloud,
} from "@/components/FeatureList";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const stored = localStorage.getItem("sidebarVisible");
    if (stored !== null) {
      setSidebarVisible(JSON.parse(stored));
    } else {
      // No saved setting → hide sidebar on small (<768px) and show on md+ screens
      // setSidebarVisible(window.innerWidth >= 768);
      setSidebarVisible(false);
    }
  }, []);

  useEffect(() => {
    if (hasMounted && isSidebarVisible !== null) {
      localStorage.setItem("sidebarVisible", JSON.stringify(isSidebarVisible));
    }
  }, [isSidebarVisible, hasMounted]);

  const toggleSidebar = () =>
    setSidebarVisible((prev) => (prev === null ? true : !prev));

  return (
    <html lang="en">
      <body className={"antialiased font-sans"}>
        <div className="min-h-screen relative">
          <Header />
          <div className="flex flex-col md:flex-row">
            <div className="bg-black flex-1 top-1/2 max-w-5xl md:mx-auto min-h-screen shadow-lg text-white">
              {children}
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          <div
            className={`
    md:hidden fixed inset-0 z-20 bg-gray-100 transform transition-transform duration-300
    ${isSidebarVisible ? "translate-x-0" : "translate-x-full"}
  `}
          >
            {/* Fixed header with X */}
            <div className="fixed top-0 left-0 w-full bg-white p-4 shadow-md flex justify-center">
              <button
                onClick={toggleSidebar}
                className="text-2xl font-bold text-gray-700 hover:text-gray-900"
                aria-label="Close sidebar"
              >
                ✕
              </button>
            </div>

          </div>

          <Footer />
          <ScrollToHomeButton />
          <button
            onClick={toggleSidebar}
            className={`
            cursor-pointer fixed top-1/2 right-0 transform -translate-y-1/2
            bg-blue-500 text-white px-2 py-4 rounded-l-lg
            flex flex-col items-center space-y-0.5 hover:opacity-100
            z-10 hover:bg-blue-600 transition-colors ${isSidebarVisible ? "right-[25%] opacity-20" : "right-0 opacity-20"}
          `}
          >
            {Array.from(isSidebarVisible ? "X" : "SIDEBAR").map((char, idx) => (
              <span key={idx} className="block leading-none">
                {char}
              </span>
            ))}
          </button>
        </div>
      </body>
    </html>
  );
}
