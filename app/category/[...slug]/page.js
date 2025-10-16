import CategoryClient from "./CategoryClient";
import { getCategory } from "@/utils/generalUtils";
import { createSeoMetadata } from "@/utils/generalUtils";

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categorySlug = slug[0];
  const page = slug.length > 1 ? parseInt(slug[1], 10) : 1;
  const categoryPost = await getCategory(categorySlug, page);
  const categoryName = categoryPost[0]["gv_web_name"];
  const maxPage = categoryPost[0]["max_page_number"];
  const baseTitle = `Category "${categoryName}" Releases`;
  const title =
    page > 1 ? `${baseTitle} — Page ${page} of ${maxPage}` : baseTitle;
  const canonicalUrl =
    page > 1
      ? `/category/${categorySlug}/${page}`
      : `/category/${categorySlug}`;
  return createSeoMetadata({
    basicTitle: title,
    description: `Browse page ${page} of Japan gay video releases in the “${categoryName}” category.`,
    url: canonicalUrl,
    robots: "index,follow",
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categorySlug = slug[0];
  const page = slug.length > 1 ? parseInt(slug[1], 10) : 1;

  const categoryPost = await getCategory(categorySlug, page);

  return (
    <CategoryClient categoryPost={categoryPost} categorySlug={categorySlug} />
  );
}
