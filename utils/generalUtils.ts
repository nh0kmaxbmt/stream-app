import { getPrivateAPI } from "@/utils/getPrivateAPI";
import { CategoryProps } from "@/components/FeatureList";
import { notFound } from "next/navigation";
const webBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL || "";
const site_name = process.env.NEXT_PUBLIC_site_name;

export interface SideBarInfo {
  category_prop: CategoryProps[];
  tag_prop: CategoryProps[];
}

export async function getLatestPost() {
  const baseUrl = await getPrivateAPI();
  var res = await fetch(`${baseUrl}/stream-latest-props`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const latestProps = await res.json().then((data) => data.res);

  return latestProps;
}
export async function getVid(slug: string) {
  const baseUrl = await getPrivateAPI();
  const res = await fetch(`${baseUrl}/jgv-stream/${slug}`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const vidInfo = await res.json().then((data) => data.res);

  return vidInfo;
}

export async function getCategory(slug: string, page: number = 1) {
  const baseUrl = await getPrivateAPI();
  var res = await fetch(`${baseUrl}/stream-prop-info/category-info/${slug}/${page}`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const category_post = await res.json().then((data) => data.res);
  return category_post;
}

export async function getTag(slug: string, page: number = 1) {
  const baseUrl = await getPrivateAPI();
  var res = await fetch(`${baseUrl}/stream-prop-info/tag-info/${slug}/${page}`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const Tag_post = await res.json().then((data) => data.res);

  return Tag_post;
}

export async function getModel(slug: string) {
  const baseUrl = await getPrivateAPI();
  const res = await fetch(`${baseUrl}/jgv-model/${slug}`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const vidInfo = await res.json().then((data) => data.res);

  return vidInfo;
}

export async function getHomePageProp() {
  const baseUrl = await getPrivateAPI();
  var res = await fetch(`${baseUrl}/homepage-props`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const homePageProps = await res.json().then((data) => data.res);

  return homePageProps;
}

export async function getDiscoverProp() {
  const baseUrl = await getPrivateAPI();
  var res = await fetch(`${baseUrl}/discover-props`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const discoverProps = await res.json().then((data) => data.res);

  return discoverProps;
}

// export async function getModelProp() {
//   const baseUrl = await getPrivateAPI();
//   var res = await fetch(`${baseUrl}/model-props`);
//   if (!res.ok) {
//     // Handle the error, e.g., log it or return a fallback
//     notFound(); // This will render the 404 page
//   }
//   const discoverProps = await res.json().then((data) => data.res);

//   return discoverProps;
// }

export async function getModelProp(page: number = 1) {
  const baseUrl = await getPrivateAPI();
  var res = await fetch(`${baseUrl}/model-props/${page}`);
  if (!res.ok) {
    // Handle the error, e.g., log it or return a fallback
    notFound(); // This will render the 404 page
  }
  const modelProps = await res.json().then((data) => data.res);

  return modelProps;
}

export async function getSearchProp(query: string) {
  const baseUrl = await getPrivateAPI();
  const response = await fetch(`${baseUrl}/stream-search?query=${query}`);
  if (!response.ok) {
    return {}; // This will render the 404 page
  }
  const searchProp = await response.json().then((data) => data.res);
  return searchProp;
}

//Get sidebar categories / popular tags
const SIDEBAR_CACHE_DURATION_MS = 60 * 60 * 1000; // 60 minutes
let cacheTimestamp = 0;

let cachedSidebar: SideBarInfo | null = null;
export async function getSideBarProp(): Promise<SideBarInfo> {
  const now = Date.now();

  // Return cached value if still fresh
  if (cachedSidebar && now - cacheTimestamp < SIDEBAR_CACHE_DURATION_MS) {
    return cachedSidebar;
  }

  try {
    // Fetch via your private API endpoint (server‑only)
    const baseUrl = await getPrivateAPI();
    var res = await fetch(`${baseUrl}/sidebar-info`);

    if (!res.ok) {
      throw new Error(`Sidebar fetch failed (${res.status})`);
    }

    const data = await res.json().then((data) => data.res);

    // Update cache
    cachedSidebar = data;
    cacheTimestamp = now;

    return data;
  } catch (error) {
    console.error("Error fetching sidebar:", error);

    // If there’s a cache hit, return stale data instead of crashing
    if (cachedSidebar) {
      return cachedSidebar;
    }
    throw error;
  }
}

export async function trackView(gv_id: number) {
  let response: Response | undefined;

  try {
    const baseUrl = await getPrivateAPI();
    response = await fetch(`${baseUrl}/track-view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gv_id: gv_id,
      }),
    });

    if (!(response && response.ok)) {
      console.error("Error recording view");
    }
  } catch (error) {
    console.error("Error sending track view:", error);
  }
}

export async function trackModelView(model_id: number) {
  let response: Response | undefined;

  try {
    const baseUrl = await getPrivateAPI();
    response = await fetch(`${baseUrl}/track-model-view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_id: model_id,
      }),
    });

    if (!(response && response.ok)) {
      console.error("Error recording view");
    }
  } catch (error) {
    console.error("Error sending track view:", error);
  }
}

interface data {
  song_id?: number | null;
  album_id?: number | null;
  artist_ids: [];
}

export async function trackViewProxy(album_id: number | null) {
  let response: Response | undefined;

  try {
    const webBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL || "";
    const response = await fetch(`${webBaseUrl}/api/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        album_id: album_id,
      }),
    });

    if (!(response && response.ok)) {
      console.error("Error recording view", response);
    } else {
      return new Response(JSON.stringify({ success: true, error: "None" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error sending track view:", error);
  }
}

interface SeoMetadataParams {
  basicTitle?: string;
  description: string;
  url: string;
  robots?: string;
  structuredData?: Record<string, unknown>;
}

export function createSeoMetadata({
  basicTitle = "",
  description,
  url,
  structuredData = {},
}: SeoMetadataParams) {
  const title =
    basicTitle.trim() !== "" ? `${basicTitle} • ${site_name}` : site_name;
  const image = "/og-default.png";
  return {
    title,
    description,
    metadataBase: new URL(webBaseUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: { icon: "/favicon.ico" },
    other: {
      robots: "index, follow",
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        url,
        name: title,
        description,
        ...structuredData,
      }),
    },
  };
}
