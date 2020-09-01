// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'webkey'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/webkey`;
const client = new Client(DB_URL);

// database methods
async function createLinks({ url, title, clicks, comments, posting_date }) {
  try {
    const { rows } = await client.query(`insert into links (url, title,clicks, comments, posting_date)
    VALUES($1, $2, $3, $4, $5)
    ON CONFLICT (url) DO NOTHING
    RETURNING *;`, [url, title, clicks, comments, posting_date])
    console.log(rows, "trying to find these")
    return rows

  }
  catch (error) {
    throw error
  }
}

// export
module.exports = {
  client,
  createLinks,
  // db methods
}