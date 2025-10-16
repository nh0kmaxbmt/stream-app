// pages/search.tsx
import React from "react";
import { getSearchProp } from "@/utils/generalUtils";
import { RelatedPosts } from "@/components/FeatureList";
import { AdsterraBanner728x90 } from "@/components/FeatureFunction";
import Breadcrumb from "@/components/Breadcrumb";
import { createSeoMetadata } from "@/utils/generalUtils";

export const revalidate = 600;
export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const { query } = await searchParams; // Get 'query' from URL
  return createSeoMetadata({
    basicTitle: `Search results for "${query}"`,
    description: `Explore Japan gay videos matching “${query}”.`,
    url: `/search/?query=${encodeURIComponent(query)}`,
    image: "/images/og-default.png",
    robots: "noindex,follow",
  });
}

export default async function SearchPage({ searchParams }) {
  const { query } = await searchParams; // Get 'query' from URL

  // If no valid query is provided, render the search landing state (e.g., a search input)
  if (!query) {
    return (
      <main className="text-3xl font-bold text-center text-amber-500 py-20">
        <p>Please enter a search term to find the site.</p>
        {/* Render your search input component here */}
      </main>
    );
  }

  const searchProps = await getSearchProp(query);
  const total = searchProps.length ? searchProps.length : 0;

  return (
    <div className="container mx-auto py-2 rounded-lg">
      <Breadcrumb items={[{ label: "SEARCH", href: `` }]} />
      {/* Search Header */}
      <h1 className="text-3xl font-bold text-center text-amber-500 py-2">
        SEARCH RESULTS FOR: <span className="text-blue-600">{query}</span>
      </h1>
      <span className="text-lg grid text-center">
        {searchProps.length == 96
          ? "Maximum number of results found. Try to include more keywords to the query"
          : `${total} RESULT ${total > 1 ? "S" : ""} FOUND`}
      </span>

      <AdsterraBanner728x90 />

      {searchProps.length && (
        <div className="my-3">
          <RelatedPosts posts={searchProps} />
        </div>
      )}
    </div>
  );
}
