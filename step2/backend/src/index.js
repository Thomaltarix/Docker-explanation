const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const port = Number(process.env.BACKEND_PORT || 3002);
x
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function readCourseState() {
  const result = await pool.query(
    "SELECT version, message, updated_at FROM course_state WHERE id = 1"
  );

  if (result.rows.length === 0) {
    throw new Error("La table course_state ne contient pas encore de donnees.");
  }

  return result.rows[0];
}

async function bootCheck() {
  const state = await readCourseState();
  console.log("Migration detectee:", state.version);
}

app.get("/", (_req, res) => {
  res.json({
    step: "step2",
    status: "ready",
    hint: "Appelle /verification pour verifier docker compose.",
  });
});

app.get("/verification", async (_req, res) => {
  try {
    const state = await readCourseState();

    res.json({
      step: "step2",
      status: "success",
      message: state.message,
      version: state.version,
      databaseHost: process.env.DB_HOST,
      updatedAt: state.updated_at,
    });
  } catch (error) {
    res.status(500).json({
      step: "step2",
      status: "error",
      message: error.message,
    });
  }
});

bootCheck()
  .then(() => {
    app.listen(port, () => {
      console.log(`Step 2 backend running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Le backend ne peut pas demarrer: la migration n'a probablement pas tourne.",
      error
    );
    process.exit(1);
  });
