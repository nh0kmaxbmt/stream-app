"use client";
import React, { useState } from "react";
import { Search, User, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Post } from "@/components/FeatureList";

interface HomePageClientProps {
  // prettier-ignore
  latestPost: HomePageClientProp[];
}

interface HomePageClientProp {
  title: string;
  movies: Post[];
  max_page: number;
}

export default function HomePageClient({ latestPost }: HomePageClientProps) {
  // Take the first 5 songs from the data array
  const [query, setQuery] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);

  const filteredRows = latestPost.map((row) => ({
    ...row,
    movies: row.movies.filter((m) =>
      m.prop_title.toLowerCase().includes(query.toLowerCase()),
    ),
  }));

  const first_movie = latestPost[0].movies[0];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* HERO */}
      <main className="pt-20">
        <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
          <img
            src={first_movie.gv_cover_image}
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-12 left-8 max-w-2xl">
            <a href={first_movie.prop_slug} className="cursor-pointer">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                <span
                  className={`rounded
                ${first_movie.is_hd ? "bg-red-600 text-white" : "bg-gray-700 text-gray-200"}
              `}
                >
                  {first_movie.is_hd ? "HD" : "SD"}
                </span>
                {first_movie.prop_title}
              </h1>
            </a>
            <p className="mt-3 text-sm md:text-base text-gray-300">
              Available to stream ·{" "}
              {first_movie.year && first_movie.duration
                ? `${first_movie.year} • ${first_movie.duration} min`
                : first_movie.year
                  ? first_movie.year
                  : first_movie.duration
                    ? `${first_movie.duration} min`
                    : null}
            </p>

            <div className="mt-6 flex gap-3">
              <a href={first_movie.prop_slug} className="cursor-pointer">
                <button className="cursor-pointer flex items-center gap-2 bg-white text-black px-4 py-2 rounded text-sm font-semibold">
                  <Play size={16} /> Play
                </button>
              </a>
              {/*            <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded text-sm">
              + My List
            </button>*/}
            </div>
          </div>
        </section>

        {/* Rows */}
        <section className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {filteredRows.map((row) => (
            <div key={row.title}>
              <h2 className="text-lg md:text-2xl font-semibold mb-3">
                {row.title}
              </h2>
              <div className="relative col-span-6">
                <div className="grid gap-6 mt-3 grid-cols-3 md:grid-cols-4 gap-3 overflow-x-auto scrollbar-hide py-2">
                  {row.movies.map((movie) => (
                    <a
                      key={movie.gv_id}
                      href={movie.prop_slug}
                      className="cursor-pointer"
                    >
                      <div className="relative rounded overflow-hidden">
                        <img
                          src={movie.gv_cover_image}
                          alt={movie.prop_title}
                          className="w-full h-36 md:h-48 object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-black/30 transition-opacity pointer-events-none ${hoveredMovie === movie.gv_id ? "opacity-0" : "opacity-0"}`}
                        />
                        {/* HD/SD badge */}
                        <div
                          className={`
                          absolute bottom-1 left-1
                          text-[10px] md:text-xs font-semibold
                          px-2 py-0.5 rounded
                          ${movie.is_hd ? "bg-red-600 text-white" : "bg-gray-700 text-gray-200"}
                          backdrop-blur-sm bg-opacity-80
                        `}
                        >
                          {movie.is_hd ? "HD" : "SD"}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">
                            {movie.prop_title?.length > 100
                              ? movie.prop_title.slice(0, 100) + "..."
                              : movie.prop_title}
                          </div>
                          {movie.rating && (
                            <div className="text-xs text-gray-400">
                              {movie.rating}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {movie.year && movie.duration
                            ? `${movie.year} • ${movie.duration} min`
                            : movie.year
                              ? movie.year
                              : movie.duration
                                ? `${movie.duration} min`
                                : null}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Footer spacer */}
        <div className="h-24" />
      </main>
    </div>
  )
}
