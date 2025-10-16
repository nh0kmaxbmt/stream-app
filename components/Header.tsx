import { Search } from "lucide-react";
import Image from "next/image";
// import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from "react";

export default function Header() {
  // const router = useRouter()
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [searchQuery, setSearchQuery] = useState("");
  const [isFading, setIsFading] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh
    if (!searchQuery.trim()) return; // Avoid empty search
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  };

  const webBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL || "";
  const site_name = process.env.NEXT_PUBLIC_site_name || "";
  const site_description = process.env.NEXT_PUBLIC_site_description || "";

  const navItems = [
    { name: "HOME", url: "" },
    { name: "ABOUT", url: "about" },
    { name: "PRIVACY", url: "privacy" },
    { name: "CONTACT US", url: "contactus" },
    { name: "TERMS", url: "terms" },
  ];

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (isSearchActive || isOpen) {
        setIsFading(true);
        // After the fade transition (300ms) hide the search menu
        setTimeout(() => {
          setIsSearchActive(false);
          setIsOpen(false);
          setIsFading(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchActive, isOpen]);

  // Close the mobile menu when clicking anywhere outside the menu (and toggle button)
  useEffect(() => {
    if (!(isSearchActive || isOpen)) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node) &&
        searchToggleRef.current &&
        !searchToggleRef.current.contains(e.target as Node)
      ) {
        setIsFading(true);
        setTimeout(() => {
          setIsSearchActive(false);
          setIsFading(false);
          setIsOpen(false);
        }, 300);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSearchActive, isOpen]);

  return (
    <header>
      {/* Background Image Section with Site Name */}
      <div className="relative h-30 flex flex-col md:flex-row">
        <Image
          src="/logo.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          width={0}
          height={0}
          priority
        />
        <a href={webBaseUrl} className="relative z-10 p-4 my-auto">
          <h1 className="text-white text-3xl font-bold">{site_name}</h1>
          <h1 className="text-white text-sm font-bold">{site_description}</h1>
        </a>
      </div>

      {/* Navigation Section */}
      <nav className="bg-blue-900 pl-5 py-2 flex items-center justify-between mx-auto w-full">
        {/* Left side: Nav items */}
        <div className="flex items-center space-x-4">
          {/* Desktop Nav Items */}
          <div className="hidden md:flex relative">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`/${item.url.toLowerCase()}`}
                className="my-auto text-white group relative px-5 py-2 text-sm font-bold rounded-md transition-colors duration-300 hover:bg-blue-500 hover:shadow-md"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 block h-1 w-full bg-gradient-to-r from-purple-400 via-indigo-500 to-cyan-500 rounded-full transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button (visible on small screens) */}
          <div className="md:hidden">
            <button
              ref={searchToggleRef}
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
          )}
        </div>

        {/* Right side: Search Bar */}
        <div className="relative flex items-center">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center"
          >
            {/* Full Search Input for Medium & Large Screens */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="hidden md:block w-48 px-3 py-1 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            <button
              title="Search"
              className="hidden md:flex p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <Search className="text-white" size={20} />
            </button>

            {/* Search Icon for Small Screens */}
            <button
              ref={searchToggleRef}
              type="button"
              title="Search"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 md:hidden"
              onClick={() => setIsSearchActive(!isSearchActive)}
            >
              <Search className="text-white" size={30} />
            </button>

            {/* Expanding Search Input on Small Screens */}
            {isSearchActive && (
              <div
                ref={searchContainerRef}
                className={`z-10 text-center absolute top-12 right-0 bg-gray-800/90 p-2 rounded-md shadow-lg transition-opacity duration-300 ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-48 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                />
                <button className="font-semibold p-1 px-6 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 md:hidden bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  SEARCH
                </button>
              </div>
            )}
          </form>
        </div>
      </nav>

      {/* Ads: Popup */}
      <script async
        type="text/javascript"
        src="//barnabaslinger.com/bd/4c/35/bd4c35eb0f3f2e939a48d5f67522d0f8.js"
      ></script>
    </header>
  );
}
