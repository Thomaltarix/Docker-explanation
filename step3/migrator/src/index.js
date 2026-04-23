const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();

const maxAttempts = 20;
const waitInMs = 2000;

function createClient() {
  return new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
}

async function waitForDatabase() {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const client = createClient();

    try {
      await client.connect();
      await client.end();
      console.log(`Database ready after attempt ${attempt}`);
      return;
    } catch (error) {
      await client.end().catch(() => {});
      console.log(`Database not ready yet (attempt ${attempt}/${maxAttempts})`);

      if (attempt === maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, waitInMs));
    }
  }
}

async function migrate() {
  const client = createClient();

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      motto TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await client.query(
    `
      INSERT INTO heroes (id, name, role, motto, updated_at)
      VALUES (1, $1, $2, $3, NOW())
      ON CONFLICT (id)
      DO UPDATE SET
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        motto = EXCLUDED.motto,
        updated_at = NOW()
    `,
    [process.env.HERO_NAME, process.env.HERO_ROLE, process.env.HERO_MOTTO]
  );

  await client.end();
  console.log("Step 3 migration completed successfully");
}

waitForDatabase()
  .then(migrate)
  .catch((error) => {
    console.error("Migration failed", error);
    process.exit(1);
  });
