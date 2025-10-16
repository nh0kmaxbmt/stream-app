// lib/apiKey.js
import { Pool } from 'pg';

// Create a single instance of Pool.
// This instance can be reused for all database queries to avoid opening many connections.
const pool = new Pool({
  user: process.env.PG_USER,       // e.g., "api_user"
  host: process.env.PG_HOST,       // e.g., "localhost"
  database: process.env.PG_DATABASE, // e.g., "api_db"
  password: process.env.PG_PASSWORD, // e.g., "YourStrongPassword"
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432, // e.g., 5432
});

let cachedPrivateAPI: string | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 1 * 60 * 1000; // 1 minutes

/**
 * Asynchronously fetches the private API key from the PostgreSQL database.
 *
 * @param {string} name - The unique name/identifier for the API key. Defaults to 'my_private_api'.
 * @returns {Promise<string>} - Resolves with the API key if found.
 * @throws Will throw an error if the API key is not found or if a database error occurs.
 */
async function fetchPrivateAPIFromSource() {
  try {
    const api_name = process.env.PRI_API_NAME;
    // Prepare the SQL query
    const queryText = 'SELECT api_key FROM private_api WHERE name = $1';
    const values = [api_name];

    // Execute the query
    const { rows } = await pool.query(queryText, values);

    // Check if the API key exists
    if (!rows.length) {
      throw new Error(`API key not found for name: ${name}`);
    }

    // Return the API key
    return rows[0].api_key;
  } catch (error) {
    console.error('Error fetching API key:', error);
    throw error;
  }
}

export async function getPrivateAPI() {
  const now = Date.now();

  // If the cached value exists and is still fresh, return it.
  if (cachedPrivateAPI && now - cacheTimestamp < CACHE_DURATION_MS) {
    return cachedPrivateAPI;
  }

  // Otherwise, fetch a new value.
  const newPrivateAPI = await fetchPrivateAPIFromSource();

  // Cache the new value and update the timestamp.
  cachedPrivateAPI = newPrivateAPI;
  cacheTimestamp = now;

  return newPrivateAPI;
}
