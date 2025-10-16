import { redirect } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import {
  DiagonalBanner,
  ZoomableImage,
  AdsterraBanner728x90,
} from "@/components/FeatureFunction";
import {
  SideBarCloud,
  CategoryProps,
  Post,
  RelatedPosts,
  ReportButton,
} from "@/components/FeatureList";

export default async function VidClient({ video }) {
  const gvCodeDisplay = video.gv_codeslug
    ? video.gv_codeslug.toUpperCase() + "-" + video.gv_code.toUpperCase()
    : video.gv_code.toUpperCase();
  const video_host = "streamtape";
  const target = video.gv_content_info?.find(
    (item) => item.host === video_host,
  );
  const vid_link = target?.url ?? "";

  const ep = 1;
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 px-6 py-1">
      <Breadcrumb
        items={[
          {
            label: video.gv_web_name.toUpperCase(),
            href: `/category/${video.gv_web_slug}`,
          },
          {
            label: gvCodeDisplay,
            href: ``,
          },
        ].filter(Boolean)}
      />
      {/* --- Video Player Section --- */}
      <section className="my-auto mx-auto mb-8">
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg flex items-center justify-center border border-zinc-800">
          <div className="grid place-items-center w-full h-full">
            {vid_link ? (
              <iframe
                src={`https://${video_host}.com/e/${target.url}/${gvCodeDisplay}.mp4`}
                // width="600"
                // height="400"
                className="w-[90%] h-[90%] rounded-lg"
                allowFullScreen
                allowtransparency="true"
                allow="autoplay"
                scrolling="no"
                frameBorder="0"
              ></iframe>
            ) : (
              "Something went wrong. Please help us report this issue so we can fix it"
            )}
          </div>
        </div>
          <ReportButton videoId={video.gv_id} message={"Something is wrong for this video"}/>
      </section>

      <div className="px-4">
        <div className="bg-zinc-900 rounded-t-lg"></div>
        <h1 className="text-2xl font-bold px-2 py-5 uppercase">
          {video.gv_name}
        </h1>
        <div className="grid grid-cols-12 p-1">
          <div className="col-span-7 place-items-center grid">
            <ZoomableImage
              thumbnailSrc={video.gv_cover_image}
              // thumbnailSrc={
              //   "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
              // }
              originalSrc={video.gv_cover_image.replace(
                /^\/thumbnail-img\//,
                "/cover-img/",
              )}
              alt={`${gvCodeDisplay}'s cover`}
            />
          </div>

          <dl className="col-span-5 pl-2 pt-2 text-sm">
            <dt className="text-xl font-semibold text-red-300">CODE</dt>
            <dd>{video.gv_code}</dd>

            {video.gv_runtime > 0 && (
              <>
                <dt className="text-xl text-red-300 font-semibold pt-2">
                  RUNTIME
                </dt>
                <dd>{String(video.gv_runtime).padStart(2, "0")} minutes</dd>
              </>
            )}

            {video.gv_trans && (
              <>
                <dt className="text-xl text-red-300 font-semibold pt-2">
                  ENGLISH NAME
                </dt>
                <dd>{video.gv_trans}</dd>
              </>
            )}

            {video.gv_date && (
              <>
                <dt className="text-xl text-red-300 font-semibold pt-2">
                  RELEASE DATE
                </dt>
                <dd>{video.gv_date}</dd>
              </>
            )}

            {video.gv_tags.length > 0 && (
              <>
                <dt className="text-xl text-red-300 font-semibold pt-2">
                  TAGS
                </dt>
                <dd>
                  <div className="flex flex-wrap gap-x-2">
                    {video.gv_tags.map((tag, idx) => (
                      <span key={tag.tag_id} className="inline">
                        <a
                          href={`/tag/${tag.tag_slug}`}
                          className="text-gray-100 font-semibold hover:underline"
                        >
                          {tag.tag_name}
                        </a>
                        {idx < video.gv_tags.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </dd>
              </>
            )}
            {/*Description content*/}
            {video.gv_description && (
              <>
                <dt className="text-xl text-red-300 font-semibold pt-2">
                  DESCRIPTION
                </dt>
                <dd>{video.gv_description}</dd>
              </>
            )}
          </dl>
        </div>
        {/* Ads: Native Banner */}
        <script
          async="async"
          data-cfasync="false"
          src="//barnabaslinger.com/9470ed88bb3e7afebc35f5459fee6794/invoke.js"
        ></script>
        <div id="container-9470ed88bb3e7afebc35f5459fee6794"></div>
        {/*Model content*/}
        {/*        <AdsterraBanner728x90 />
        <section className="mb-8">
          <DiagonalBanner title="Related Posts" fromColor="from-red-500" />
          {video.gv_related_data.length > 0 && (
            <RelatedPosts posts={video.gv_related_data} />
          )}
        </section>
*/}{" "}
      </div>
      <h2 className="text-2xl font-bold px-2 py-5 text-red-300">
        {"Recommended for you"}
      </h2>
      {video.gv_related_data.length > 0 && (
        <RelatedPosts posts={video.gv_related_data} />
      )}
    </main>
  );
}
