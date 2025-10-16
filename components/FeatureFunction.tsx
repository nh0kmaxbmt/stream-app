// components/TrackLink.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export const AdsterraBanner728x90 = () => {
  return (
    <div
      className="grid place-items-center p-2"
      dangerouslySetInnerHTML={{
        __html: `
              <script type="text/javascript">
                atOptions = {
                  'key' : 'e3587db5a00e7a2324084aec328025a9',
                  'format' : 'iframe',
                  'height' : 90,
                  'width' : 728,
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="//barnabaslinger.com/e3587db5a00e7a2324084aec328025a9/invoke.js"></script>          `,
      }}
    />
  );
};


interface DiagonalBannerProps {
  title: string;
  fromColor?: string; // e.g., "#f56565" for red-500
  toColor?: string; // e.g., "#cbd5e1" for slate-300
}

interface ZoomableImageProps {
  /** small preview image */
  thumbnailSrc: string;
  /** full‑size image to zoom to; if absent, thumbnailSrc is used */
  originalSrc?: string;
  alt: string;
  width?: number;
  height?: number;
}

export const DiagonalBanner = ({
  title,
  fromColor = "from-blue-500",
  toColor = "to-blue-900",
}: DiagonalBannerProps) => {
  return (
    <div className="py-3">
      <div
        className={`z-0 inline-block px-16 py-2 font-bold uppercase bg-gradient-to-r ${fromColor} ${toColor}`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
        }}
      >
        {title}
      </div>
    </div>
  );
};



export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  thumbnailSrc,
  originalSrc,
  alt,
  width = 500,
  height = 500,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed((prev) => !prev);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isZoomed) {
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed]);

  // Decide which src to use in the modal
  const modalSrc = originalSrc ?? thumbnailSrc;

  return (
    <>
      {/* Thumbnail preview */}
      <div onClick={toggleZoom} className="cursor-pointer overflow-hidden">
        <Image
          src={thumbnailSrc}
          alt={alt}
          width={width}
          height={height}
          objectFit="cover"
        />
      </div>

      {/* Zoomed modal */}
      {isZoomed && (
        <div
          onClick={toggleZoom}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
        >
          <div className="relative w-11/12 h-11/12">
            <Image
              src={modalSrc}
              alt={alt}
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
};
