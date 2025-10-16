import { getDiscoverProp } from "@/utils/generalUtils";
import { RelatedPosts } from "@/components/FeatureList";
import Breadcrumb from "@/components/Breadcrumb";
import { createSeoMetadata } from "@/utils/generalUtils";
import { AdsterraBanner728x90 } from "@/components/FeatureFunction";

// /app/page.js
export const revalidate = 3600;
export const dynamic = "force-dynamic";

export const metadata = createSeoMetadata({
  basicTitle: "Discover",
  description:
    "Browse the newest Japan gay videos — always up‑to‑date - EXFEED, BOYSLAB, GB-STORE, gb-dangun(男銃), MEGA HUNK CHANNEL, H0230, KO-TUBE, DAIICHISOUKO, BOYSTUDIO(ボーイスタジオ), Men's Rush.TV, BULKYCH(バルキーチャンネル), STR8 BOYS(公式動画配信サイト), FUTURE BOY, TRANCE-VIDEO, CK-DOWNLOAD, FC2, KO-SHOP, ACCEED, etc.",
  url: "/discover",
  robots: "index,follow",
});

export default async function Home() {
  const discoverProps = await getDiscoverProp();
  return (
    <div className="my-3">
      <Breadcrumb items={[{ label: "DISCOVER", href: `` }]} />
      <AdsterraBanner728x90 />
      <RelatedPosts posts={discoverProps} />
      <AdsterraBanner728x90 />
    </div>
  );
}
