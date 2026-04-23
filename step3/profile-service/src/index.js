const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const port = Number(process.env.PROFILE_SERVICE_PORT || 3010);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function readHero() {
  const result = await pool.query(
    "SELECT name, role, motto, updated_at FROM heroes WHERE id = 1"
  );

  if (result.rows.length === 0) {
    throw new Error("Aucun profil disponible dans la base.");
  }

  return result.rows[0];
}

async function bootCheck() {
  const hero = await readHero();
  console.log(`Hero loaded for profile-service: ${hero.name}`);
}

app.get("/health", (_req, res) => {
  res.json({
    service: "profile-service",
    status: "ok",
  });
});

app.get("/profile", async (_req, res) => {
  try {
    const hero = await readHero();

    res.json({
      service: "profile-service",
      hero,
    });
  } catch (error) {
    res.status(500).json({
      service: "profile-service",
      status: "error",
      message: error.message,
    });
  }
});

bootCheck()
  .then(() => {
    app.listen(port, () => {
      console.log(`Profile service running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Profile service could not start because the database is not ready.",
      error
    );
    process.exit(1);
  });
