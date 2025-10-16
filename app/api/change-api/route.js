import { NextResponse } from 'next/server';
import { Pool } from 'pg';
export const dynamic = 'force-dynamic';

// Create a PostgreSQL connection pool
// Create a connection pool using environment variables
const pool = new Pool({
  user: process.env.PG_USER,       // e.g., "api_user"
  host: process.env.PG_HOST,       // e.g., "localhost"
  database: process.env.PG_DATABASE, // e.g., "api_db"
  password: process.env.PG_PASSWORD, // e.g., "YourStrongPassword"
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432, // e.g., 5432
});
const site_name = process.env.NEXT_PUBLIC_site_name;


export async function POST(request) {
  // Check for the custom header "author_lyriczen"
  console.log(request.headers)
  const authorHeader = request.headers.get(`author-${site_name}`);
  if (authorHeader !== '1') {
    return NextResponse.json(
      { error: 'Unauthorized: Missing or incorrect custom header' },
      { status: 401 }
    );
  }

  // Parse the JSON payload
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON', error }, { status: 400 });
  }

  // Destructure the required parameters from the payload
  const { api_key, api_value } = payload;
  if (!api_key || api_value === undefined) {
    return NextResponse.json(
      { error: 'Missing required parameters: api_key and api_value' },
      { status: 400 }
    );
  }

  try {
    // Update the specified row in your PostgreSQL database
    const result = await pool.query(
      'UPDATE private_api SET api_key = $1 WHERE name = $2 RETURNING *',
      [api_value, api_key]
    );

    // Check if a row was updated
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Row not found' }, { status: 404 });
    }

    // Return the updated row
    return NextResponse.json({ status: 'ok', data: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Database update error:', error);
    return NextResponse.json({ error: 'Database error', api_value, api_key, error}, { status: 500 });
  }
}


/*
curl -X POST 'localhost:3000/api/change-api' \
  -H "Content-Type: application/json" \
  -H "author_lyriczen: 1" \
  -d '{"api_key": "my_zmp3_private_api", "api_value": "http://localhost:8001/zmp3"}'
*/