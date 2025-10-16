import { getPrivateAPI } from "@/utils/getPrivateAPI";
export const dynamic = "force-dynamic";
import { getClientIp } from "request-ip"; // optional npm package

export async function POST(request) {
  try {
    const data_body = await request.json();
    const { post_id, body } = data_body;
    const ip = getClientIp(request) || "unknown";

    if (!post_id || !body) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required field" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const baseUrl = await getPrivateAPI();
    const response = await fetch(`${baseUrl}/api/stream-report-contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id, body, ip }),
    });

    // 4. Return the FastAPI response
    if (!response.ok) {
      // console.error('Error recording view');
      return new Response(
        JSON.stringify({
          success: false,
          error: "Error recording report message" + " " + post_id +  " " + body +  " " + ip,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await response.json();
    return new Response(
      JSON.stringify({
        success: true,
        error: "None",
        message: data.message,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    // console.error('Error sending track view:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
