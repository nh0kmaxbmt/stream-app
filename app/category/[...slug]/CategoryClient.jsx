"use client"; // This marks the file as a client component
import Breadcrumb from "@/components/Breadcrumb";
import { AdsterraBanner728x90 } from "@/components/FeatureFunction";
import { RelatedPosts } from "@/components/FeatureList";

export default function CategoryClient({ categoryPost, categorySlug }) {
  const currentPage = categoryPost[0]["page_number"];
  const categoryName = categoryPost[0]["gv_web_name"];
  const maxPage = categoryPost[0]["max_page_number"]
    ? categoryPost[0]["max_page_number"]
    : 1;

  return (
    <>
      <Breadcrumb items={[{ label: categoryName, href: `` }]} />
      <div className="px-4">
        <AdsterraBanner728x90 />
        {categoryPost.length > 0 && (
          <RelatedPosts
            prop_slug={`/category/${categorySlug}`}
            posts={categoryPost}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        )}
        <AdsterraBanner728x90 />
      </div>
    </>
  );
}
