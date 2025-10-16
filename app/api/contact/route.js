import { getPrivateAPI } from '@/utils/getPrivateAPI';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const data_body = await request.json();
    const { owner, title, body } = data_body;

    if (!title || !body) {
        return new Response(JSON.stringify({ success: false, error: "Missing required field" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    const baseUrl = await getPrivateAPI();
    const response = await fetch(`${baseUrl}/api/stream-contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, title, body }),
    });

    // 4. Return the FastAPI response
  if (!response.ok) {
    // console.error('Error recording view');
    return new Response(
      JSON.stringify({ success: false, error: 'Error recording contact message' }),
      {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({ success: true, error: "None" }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
  } catch (error) {
    // console.error('Error sending track view:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
