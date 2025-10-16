"use client"; // This marks the file as a client component
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { RelatedPosts } from "@/components/FeatureList";
import { AdsterraBanner728x90 } from "@/components/FeatureFunction";

export default function TagClient({ TagPost, tagSlug }) {
  const TagName = TagPost[0]["gv_tag_name"];
  const currentPage = TagPost[0]["page_number"];
  const maxPage = TagPost[0]["max_page_number"]
    ? TagPost[0]["max_page_number"]
    : 1;

  return (
    <>
      <Breadcrumb items={[{ label: TagName, href: `` }]} />
      <div className="px-4">
        <AdsterraBanner728x90 />
        {TagPost.length > 0 && (
          <RelatedPosts
            prop_slug={`/tag/${tagSlug}`}
            posts={TagPost}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        )}
        <AdsterraBanner728x90 />
      </div>
    </>
  );
}
