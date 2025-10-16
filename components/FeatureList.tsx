"use client";
// components/FeatureAlbumsList.tsx
import Image from "next/image";
import React, { useState } from "react";
// import { useEffect } from "react";

export interface Post {
  prop_slug: string;
  gv_cover_image?: string;
  gv_code: string;
  gv_name: string;
  uuid?: string;
  // title: string;
  prop_title: string;
  is_hd?: boolean;
  year?: string;
  duration?: string;
  gv_id?: number;
  rating?: number;
}

interface RelatedPostProps {
  post: Post;
  layout: "vertical" | "horizontal" | "small-icon";
}

interface RelatedPostsProps {
  posts: Post[];
  prop_slug?: string;
  currentPage?: number;
  maxPage?: number;
}

interface SideBarProps {
  props?: CategoryProps[];
  propType?: string;
}

export interface CategoryProps {
  name: string;
  slug: string;
}

type PaginationProps = {
  current: number;
  max: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ current, max, onChange }: PaginationProps) => {
  // State for the ellipsis popups (if you still want to support them)
  const [activeEllipsisIndex, setActiveEllipsisIndex] = useState<number | null>(
    null,
  );
  // State for the custom page input for the inline "[input]/max" element.
  // Initialize it with the current page.
  const [customPageInput, setCustomPageInput] = useState(current.toString());
  const [isCustomInputFocused, setIsCustomInputFocused] = useState(false);

  // Build the pagination pages array:
  const pages = [];
  for (let i = 1; i <= max; i++) {
    if (i <= 3 || i > max - 2 || Math.abs(i - current) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  // Function to validate and submit the custom page number.
  const handleCustomInputSubmit = () => {
    if (customPageInput === "") return;
    const targetPage = Number(customPageInput);
    if (targetPage >= 1 && targetPage <= max) {
      onChange(targetPage);
    }
  };

  // Update the custom input when the current page changes externally.
  // (Optional: you can add an effect here if needed)

  return (
    <nav
      aria-label="Page navigation"
      className="flex flex-wrap justify-center font-bold items-center md:space-x-2 gap-2 my-4"
    >
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 disabled:hidden cursor-pointer"
      >
        ← Previous
      </button>

      {pages.map((p, index) =>
        p === "…" ? (
          <div key={`ellipsis-${index}`} className="relative inline-block">
            <button
              onClick={() =>
                setActiveEllipsisIndex((prev) =>
                  prev === index ? null : index,
                )
              }
              className="px-3 py-2 border border-white rounded bg-white text-sky-700 cursor-pointer"
            >
              …
            </button>
            {activeEllipsisIndex === index && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-white border rounded shadow-md z-10">
                <input
                  type="number"
                  min="1"
                  max={max}
                  value={customPageInput}
                  onChange={(e) => setCustomPageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCustomInputSubmit();
                      setActiveEllipsisIndex(null);
                    }
                  }}
                  className="w-20 p-1 border rounded text-black"
                />
                <button
                  onClick={() => {
                    handleCustomInputSubmit();
                    setActiveEllipsisIndex(null);
                  }}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Go
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            key={`${p}-${index}`}
            disabled={p === current}
            aria-current={p === current ? "page" : undefined}
            onClick={() => typeof p === "number" && onChange(p)}
            className={`px-3 py-2 border border-white rounded hover:bg-blue-500 hover:text-white transition-colors duration-150 ${
              p === current
                ? "bg-blue-500 text-white font-semibold"
                : "text-sky-700 bg-white"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        disabled={current === max}
        onClick={() => onChange(current + 1)}
        className="px-3 py-2 border border-gray-300 rounded hover:bg-blue-500 disabled:hidden cursor-pointer"
      >
        Next →
      </button>
      {/* New inline custom page input element, formatted as "[input]/max" */}
      {pages.includes("…") && (
        <div className="relative inline-block">
          <div className="px-3 py-2 border border-white rounded bg-white text-sky-700 flex items-center">
            <span></span>
            <input
              aria-label="Page number to go"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              min="1"
              max={max}
              value={customPageInput}
              onChange={(e) => setCustomPageInput(e.target.value)}
              onFocus={() => setIsCustomInputFocused(true)}
              onBlur={() => setIsCustomInputFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCustomInputSubmit();
                }
              }}
              className="w-12 text-center border-none bg-transparent focus:outline-none text-black"
              // placeholder={current.toString()}
            />
            <span>/{max}</span>
            {isCustomInputFocused && (
              <button
                onMouseDown={(e) => e.preventDefault()} // Prevents losing focus when clicking
                onClick={handleCustomInputSubmit}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-blue-500 text-white rounded shadow-md"
              >
                Go
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const RelatedPost: React.FC<RelatedPostProps> = ({ post, layout }) => {
  // Truncate the title to a given limit and add "..." if needed

  const IMAGE_PROPS = {
    horizontal: { width: 500, height: 500 },
    vertical: { fill: true, style: { objectFit: "cover" } },
    "small-icon": { fill: true, style: { objectFit: "cover" } },
  } as const;
  const imageProps = IMAGE_PROPS[layout] ?? IMAGE_PROPS.horizontal;

  const CONTAINER_CLASSES_PROPS = {
    horizontal: "",
    vertical: "w-40 md:w-48 h-80 overflow-hidden",
    "small-icon": "w-20 h-20 md:w-30 md:h-40 overflow-hidden",
  };
  const containerClasses =
    CONTAINER_CLASSES_PROPS[layout] ?? CONTAINER_CLASSES_PROPS.horizontal;

  return (
    <li>
      <a href={post.prop_slug} className="text-gray-300">
        {/* Wrap both image and text in the same parent */}
        <div className="group grid place-items-center">
          {/* Mark the image container as a "peer" */}
          <div
            className={`relative place-items-center rounded-lg ${containerClasses} peer`}
          >
            <Image
              className="group-hover:scale-110 transform transition-transform duration-300"
              src={post.gv_cover_image || "/fallback.jpg"}
              alt={
                post.gv_code
                  ? `${post.gv_code}'s cover image`
                  : post.gv_name
                    ? `${post.gv_name}'s Profile Picture`
                    : "Related Post"
              }
              {...imageProps}
            />
            <div
              className={`
                          absolute bottom-1 left-1
                          text-[10px] md:text-xs font-semibold
                          px-2 py-0.5 rounded
                          ${post.is_hd ? "bg-red-600 text-white" : "bg-gray-700 text-gray-200"}
                          backdrop-blur-sm bg-opacity-80
                        `}
            >
              {post.is_hd ? "HD" : "SD"}
            </div>
          </div>
          {/* The span is outside the image container but still in the same parent.
              Using peer-hover:hidden makes it hide when the peer (the image container) is hovered. */}
          <span className="mt-2 text-center whitespace-normal break-all text-sm grid bg-zinc-900">
            {post.gv_code && (
              <span className="font-semibold text-base text-red-300">
                [{post.gv_code}]
              </span>
            )}
            {post.prop_title}
          </span>
        </div>
      </a>
    </li>
  );
};

const GRID_CSS_PROPS = {
  horizontal: "md:grid-cols-2",
  vertical: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  "small-icon": "grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
};

// const BREAKPOINTS = { md: 768, lg: 1024 };
// // 1) Define a uniform type for each config entry
// type ColConfig = { base: number; md?: number; lg?: number };

// const COL_CONFIG: Record<keyof typeof GRID_CSS_PROPS, ColConfig> = {
//   horizontal: { base: 1, md: 2 },
//   vertical: { base: 2, md: 3, lg: 4 },
//   "small-icon": { base: 3, md: 4, lg: 6 },
// } as const;

// export function useColumns(layout: keyof typeof COL_CONFIG) {
//   // 1) pull the three numbers straight out of the config
//   const { base, md, lg } = COL_CONFIG[layout];

//   // 2) seed your state from the "base" value
//   const [cols, setCols] = useState(base);

//   useEffect(() => {
//     function update() {
//       const w = window.innerWidth;
//       if (lg !== undefined && w >= BREAKPOINTS.lg) {
//         setCols(lg);
//       } else if (md !== undefined && w >= BREAKPOINTS.md) {
//         setCols(md);
//       } else {
//         setCols(base);
//       }
//     }

//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//     // 3) now list exactly the values you used inside the effect
//   }, [base, md, lg]);

//   return cols;
// }

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  prop_slug,
  currentPage,
  maxPage,
}) => {
  const [layout, setLayout] = useState<
    "vertical" | "horizontal" | "small-icon"
  >("small-icon"); // Start with horizontal layout
  // Toggle layout between vertical and horizontal

  const gridCss = GRID_CSS_PROPS[layout] ?? GRID_CSS_PROPS.horizontal;

  const handlePageChange = (page: number) => {
    const next_link = `${prop_slug}/${page}`;
    window.location.href = next_link;
  };

  // const COLUMNS = useColumns(layout);
  // const rows = Math.ceil(posts.length / COLUMNS);
  // const chunkSize = Math.ceil(rows / 3);
  // const segments = [
  //   posts.slice(0, chunkSize * COLUMNS),
  //   posts.slice(chunkSize * COLUMNS, 2 * chunkSize * COLUMNS),
  //   posts.slice(2 * chunkSize * COLUMNS), // to end
  // ];
  // const firstCutIndex = chunkSize * COLUMNS; // end of segment 1
  // const secondCutIndex = chunkSize * 2 * COLUMNS; // end of segment 2
  // // 5) our banner slots are “after” those indices
  // const adPositions = [firstCutIndex, secondCutIndex];
  // console.log("COLUMNS", COLUMNS);
  // console.log("rows", rows);
  // console.log("chunkSize", chunkSize);
  // console.log("segments", segments);
  // console.log("adPositions", adPositions);
  return (
    <div>
      <span className="font-bold test-lg px-3 text-gray-300">VIEW</span>
      {/* Small Icon Layout Button */}
      <button
        title="Small View"
        onClick={() => setLayout("small-icon")}
        className={`p-2 border rounded transition-colors cursor-pointer
          ${layout === "small-icon" ? "bg-gray-300" : "hover:bg-gray-100"}`}
        aria-label="Vertical layout"
      >
        {/* Icon for vertical layout (two vertical bars) */}
        <svg
          className="w-2 h-2"
          viewBox="0 0 3 3"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={col + 0.5}
                cy={row + 0.5}
                r={0.5}
              />
            )),
          )}
        </svg>
      </button>

      <button
        title="Vertical View"
        onClick={() => setLayout("vertical")}
        className={`p-2 border rounded transition-colors cursor-pointer
          ${layout === "vertical" ? "bg-gray-300" : "hover:bg-gray-100"}`}
        aria-label="Vertical layout"
      >
        {/* Icon for vertical layout (two vertical bars) */}
        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
          <rect x="0" y="0" width="10" height="24" />
          <rect x="14" y="0" width="10" height="24" />
        </svg>
      </button>

      {/* Horizontal Layout Button */}
      <button
        title="Horizontal View"
        onClick={() => setLayout("horizontal")}
        className={`p-2 border rounded transition-colors cursor-pointer
          ${layout === "horizontal" ? "bg-gray-300" : "hover:bg-gray-100"}`}
        aria-label="Horizontal layout"
      >
        {/* Icon for horizontal layout (two horizontal bars) */}
        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
          <rect x="0" y="0" width="24" height="10" />
          <rect x="0" y="14" width="24" height="10" />
        </svg>
      </button>
      <ul className={`grid gap-6 mt-3 ${gridCss}`}>
        {posts.map((postInfo, index) => (
          <RelatedPost key={index} post={postInfo} layout={layout} />
        ))}
      </ul>
      {currentPage && maxPage && (
        <Pagination
          current={currentPage}
          max={maxPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export const SideBarList: React.FC<SideBarProps> = ({
  props = [],
  propType,
}) => {
  return (
    <>
      <ul className="">
        {props.map(({ name, slug }) => (
          <li key={slug} className="border-gray-300 border-b-2 py-2">
            <a
              href={`/${propType}/${slug}`}
              className="hover:custom-gradient-b"
            >
              <span className="text-black">{name}</span>{" "}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

interface TagItem {
  name: string;
  slug: string;
  count?: number;
}

export const SideBarCloud: React.FC<{ props: TagItem[]; propType: string }> = ({
  props,
  propType,
}) => {
  if (!props.length) return null;

  // Determine min/max counts for scaling
  const counts = props.map((t) => t.count ?? 1);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  const getSizeClass = (count: number) => {
    const scale = (count - min) / Math.max(max - min, 1);
    if (scale < 0.2) return "text-xs";
    if (scale < 0.4) return "text-sm";
    if (scale < 0.6) return "text-base";
    if (scale < 0.8) return "text-lg";
    return "text-xl";
  };

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {props.map(({ name, slug, count = 1 }) => (
          <li key={slug}>
            <a
              href={`/${propType}/${slug}`}
              className={`
                ${getSizeClass(count)}
                inline-block px-3 py-1 rounded 
                bg-zinc-300 hover:bg-blue-700 hover:text-white transition
              `}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

interface ReportButtonProps {
  videoId: string;
  message: string;
}

export const ReportButton: React.FC<ReportButtonProps> = ({ videoId, message }) => {
  const [status, setStatus] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const handleReport = async () => {
    try {
      const res = await fetch("/api/report-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "post_id": videoId, "body":message }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Thanks! We've received your report.");
        setIsOpen(true)
      } else {
        setStatus(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending report.");
    }
  };

  return (
    <div className="py-3">
      <button
        onClick={handleReport}
        disabled={!!status} // disable if status exists
        className={`
          ${status ? "bg-gray-400 cursor-not-allowed" : "bg-red-700 hover:bg-red-500"}
          text-white font-semibold
          px-4 py-2 rounded-lg
          shadow-md ${status ? "" : "hover:shadow-lg"}
          transition duration-200 ease-in-out
          focus:outline-none focus:ring-2 ${status ? "" : "focus:ring-red-400"} focus:ring-offset-2
        `}      >
        {status ? "Reported": "Not playing?"}
      </button>
        {/* Success Popup Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Report Sent!</h2>
              <p className="text-gray-300 mb-4">
                We have received your report for this video.
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
                onClick={() => setIsOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
