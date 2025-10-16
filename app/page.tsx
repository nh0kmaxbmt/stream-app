// import React, { useState } from "react";
import { getLatestPost } from "@/utils/generalUtils";
import HomePageClient from "@/app/HomePageClient";

// Netflix-like streaming page for Next.js (page.tsx)
// Tailwind CSS assumed to be configured in the project.
// This is a single-file React component (default export) you can drop into the app/router as app/(some)/page.tsx

type Movie = {
  id: number;
  title: string;
  year?: number;
  duration?: string;
  rating?: string;
  image: string;
};

// const sampleRows: { title: string; movies: Movie[] }[] = [
//   // {
//   //   title: "Continue Watching",
//   //   movies: Array.from({ length: 8 }).map((_, i) => ({
//   //     id: i + 1,
//   //     title: `The Great Show ${i + 1}`,
//   //     year: 2022 + (i % 3),
//   //     duration: `${90 + i}m`,
//   //     rating: `${8 - (i % 3)}.0`,
//   //     image: `https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=1200&q=60&auto=format&fit=crop&ixlib=rb-4.0.3&s=${i}`,
//   //   })),
//   // },
//   {
//     title: "Trending Now",
//     movies: Array.from({ length: 10 }).map((_, i) => ({
//       id: 100 + i + 1,
//       title: `Trending ${i + 1}`,
//       year: 2020 + (i % 5),
//       duration: `${80 + i}m`,
//       rating: `${7 + (i % 2)}.5`,
//       image: `https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=60&auto=format&fit=crop&ixlib=rb-4.0.3&s=${100 + i}`,
//     })),
//   },
//   {
//     title: "Top Picks for You",
//     movies: Array.from({ length: 9 }).map((_, i) => ({
//       id: 200 + i + 1,
//       title: `Pick ${i + 1}`,
//       year: 2019 + (i % 6),
//       duration: `${70 + i}m`,
//       rating: `${6 + (i % 4)}.8`,
//       image: `https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1200&q=60&auto=format&fit=crop&ixlib=rb-4.0.3&s=${200 + i}`,
//     })),
//   },
// ];

export default async function Page() {
  const latestPost = await getLatestPost();
  return (
    <HomePageClient
      latestPost={latestPost}
    />
  );
}
