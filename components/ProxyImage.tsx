export default function imageLoader({ src }: { src: string }): string {
  try {
    const url = new URL(src);
    // If it’s an absolute URL on another host → proxy it
    if ((url.protocol === "http:" || url.protocol === "https:") &&
        url.hostname.toLowerCase() !== process.env.NEXT_PUBLIC_site_domain?.toLowerCase()) {
      return `/images/?url=${encodeURIComponent(src)}`;
    }
  } catch {
    // Not an absolute URL — return unchanged
  }
  return src;
}
