// app/song/[songSlug]/SongClient.jsx
"use client"; // This marks the file as a client component
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { RelatedSongsList, RelatedPosts } from "@/components/FeatureList";
import {
  DiagonalBanner,
  ZoomableImage,
  AdsterraBanner728x90,
} from "@/components/FeatureFunction";
import { SongSchema } from "@/components/PropSchema";
import Image from "next/image";

// Usage:

export default function VidClient({ vidInfo }) {
  const gvCodeDisplay = vidInfo.gv_codeslug
    ? vidInfo.gv_codeslug.toUpperCase() + "-" + vidInfo.gv_code.toUpperCase()
    : vidInfo.gv_code.toUpperCase();
  return (
    <>
      <Breadcrumb
        items={[
          {
            label: vidInfo.gv_web_name.toUpperCase(),
            href: `/category/${vidInfo.gv_web_slug}`,
          },
          {
            label: gvCodeDisplay,
            href: ``,
          },
        ].filter(Boolean)}
      />
      <div className="px-4">
        <div className="bg-zinc-900 rounded-t-lg">
          <div className="grid place-items-center">
          <iframe src="https://streamtape.com/e/xylApgdYzOTlkO/HD%E3%80%91%E3%80%90Seegasm%E3%80%91_261S_%28English_Subtitle%29_Gay69Stream.mp4" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>
          </div>
        </div>
          <h1 className="text-2xl font-bold px-2 py-5 uppercase custom-gradient-a border-t border-zinc-600 rounded-t-lg">
            {vidInfo.gv_name}
          </h1>

        <div className="grid grid-cols-12 bg-zinc-800 p-1">
          <div className="col-span-7 place-items-center grid">
            <ZoomableImage
              // thumbnailSrc={vidInfo.gv_cover_image}
              thumbnailSrc={"https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"}
              originalSrc={vidInfo.gv_cover_image.replace(
                /^\/thumbnail-img\//,
                "/cover-img/",
              )}
              alt={`${gvCodeDisplay}'s cover`}
            />
          </div>

          <dl className="col-span-5 pl-2 pt-2 text-sm">
            <dt className="text-xl text-white font-semibold custom-gradient-c">
              CODE
            </dt>
            <dd>{vidInfo.gv_code}</dd>

            {vidInfo.gv_runtime > 0 && (
              <>
                <dt className="text-xl text-white font-semibold custom-gradient-c pt-2">
                  RUNTIME
                </dt>
                <dd>{String(vidInfo.gv_runtime).padStart(2, "0")} minutes</dd>
              </>
            )}

            {vidInfo.gv_trans && (
              <>
                <dt className="text-xl text-white font-semibold custom-gradient-c pt-2">
                  ENGLISH NAME
                </dt>
                <dd>{vidInfo.gv_trans}</dd>
              </>
            )}

            {vidInfo.gv_date && (
              <>
                <dt className="text-xl text-white font-semibold custom-gradient-c pt-2">
                  RELEASE DATE
                </dt>
                <dd>{vidInfo.gv_date}</dd>
              </>
            )}

            {vidInfo.gv_tags.length > 0 && (
              <>
                <dt className="text-xl text-white font-semibold custom-gradient-c pt-2">
                  TAGS
                </dt>
                <dd>
                  <div className="flex flex-wrap gap-x-2">
                    {vidInfo.gv_tags.map((tag, idx) => (
                      <span key={tag.tag_id} className="inline">
                        <a
                          href={`/tag/${tag.tag_slug}`}
                          className="text-gray-100 font-semibold hover:underline"
                        >
                          {tag.tag_name}
                        </a>
                        {idx < vidInfo.gv_tags.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                </dd>
              </>
            )}
            {/*Description content*/}
            {vidInfo.gv_description && (
              <>
                <dt className="text-xl text-white font-semibold custom-gradient-c pt-2">
                  DESCRIPTION
                </dt>
                <dd>{vidInfo.gv_description}</dd>
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
          {vidInfo.gv_related_data.length > 0 && (
            <RelatedPosts posts={vidInfo.gv_related_data} />
          )}
        </section>
*/}{" "}
      </div>
    </>
  );
}
