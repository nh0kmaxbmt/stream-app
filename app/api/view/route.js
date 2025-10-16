// app/api/your-route/route.js
import { getPrivateAPI } from '@/utils/getPrivateAPI';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Extract data from the body
    const { album_id } = body;
    const baseUrl = await getPrivateAPI();

    // Validate required fields
    if ( !album_id) {
      return new Response(JSON.stringify({ success: false, error: "Missing required field" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(`${baseUrl}/api/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        album_id: album_id,
        song_id: null,
        artist_ids: []
      }),
    });

  if (!response.ok) {
    // console.error('Error recording view');
    return new Response(
      JSON.stringify({ success: false, error: 'Error recording view' }),
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