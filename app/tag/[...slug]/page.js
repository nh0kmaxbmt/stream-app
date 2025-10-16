import { getTag } from "@/utils/generalUtils";
import TagClient from "./TagClient";
import { createSeoMetadata } from "@/utils/generalUtils";

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tagSlug = slug[0];
  const page = slug.length > 1 ? parseInt(slug[1], 10) : 1;

  const TagPost = await getTag(tagSlug, page);
  const tagName = TagPost[0]["gv_tag_name"];
  const maxPage = TagPost[0]["max_page_number"]
    ? TagPost[0]["max_page_number"]
    : 1;
  const baseTitle = `Tag "${tagName}" Releases`;

  const title =
    page > 1 ? `${baseTitle} — Page ${page} of ${maxPage}` : baseTitle;
  const canonicalUrl =
    page > 1
      ? `/tag/${tagSlug}/${page}`
      : `/tag/${tagSlug}`;

  return createSeoMetadata({
    basicTitle: title,
    description: `Browse Japan gay videos tagged “${tagName}” — curated thematic collections.`,
    url: canonicalUrl,
    image: "/images/og-default.png",
    robots: "index,follow",
  });
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  const tagSlug = slug[0];
  const page = slug.length > 1 ? parseInt(slug[1], 10) : 1;

  const TagPost = await getTag(tagSlug, page);

  return <TagClient TagPost={TagPost} tagSlug={tagSlug} />;
}
