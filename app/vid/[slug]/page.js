// SongPage.js
import VidClient from "./VidClient";
import { getVid, trackView } from "@/utils/generalUtils";
import { createSeoMetadata } from "@/utils/generalUtils";

export const revalidate = 3600;
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Fetch the song data.
  const vidInfo = await getVid(slug);
  const release_web = vidInfo.gv_web_name;
  const gvCodeDisplay = vidInfo.gv_codeslug
    ? vidInfo.gv_codeslug.toUpperCase() + "-" + vidInfo.gv_code.toUpperCase()
    : vidInfo.gv_code.toUpperCase();
  const tagName = vidInfo.gv_tags
    .slice(0, 5)
    .map((tag) => tag.tag_name)
    .join(", ");
  const baseDescription = `View details and streaming links for Japan gay video release #${gvCodeDisplay} by ${release_web} tagged ${tagName}`;
  const description =
    vidInfo.gv_tags.length < 5
      ? baseDescription + "."
      : baseDescription + ", etc.";
  return createSeoMetadata({
    basicTitle: `Release ${gvCodeDisplay}`,
    description: description,
    url: `/release/${slug}`,
    image: "/images/og-default.png",
    robots: "index,follow",
  });
}

// Create a shared function for fetching the song.
// Your page component.
export default async function VidPage({ params }) {
  const { slug } = await params;
  // Fetch the song data.
  const vidInfo = await getVid(slug);
  trackView(vidInfo.gv_id);
  return <VidClient video={vidInfo} />;
}
