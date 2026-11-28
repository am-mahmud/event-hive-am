import { pool } from "./db";

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(15) NOT NULL DEFAULT 'attendee' CHECK (role IN ('attendee', 'organizer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

export const initDatabase = async () => {
  await pool.query(createTableQuery);
  console.log("Database table created");
};
