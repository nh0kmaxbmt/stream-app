// app/api/sitemap/[[...slug]]/route.js
import { NextResponse } from "next/server";
import { getPrivateAPI } from '@/utils/getPrivateAPI';
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  // params.slug is an array of URL segments if provided (e.g., ["sitemap-main.xml"]).
  const { slug } = await params

  const baseUrl = await getPrivateAPI();
  // Join the segments into a path. If no slug is provided, you'll have an empty string.
  const fastApiUrl = `${baseUrl}/sm/${slug}`;

  // Construct the FastAPI URL.
  try {
    const fastApiResponse = await fetch(fastApiUrl);
    
    if (!fastApiResponse.ok) {
      return new NextResponse("Error fetching sitemap", { status: fastApiResponse.status });
    }
    
    const sitemapXML = await fastApiResponse.text();
    
    // Return the XML content with proper headers.
    const res = new NextResponse(sitemapXML, { status: 200 });
    res.headers.set("Content-Type", "application/xml");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
