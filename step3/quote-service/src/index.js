const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.QUOTE_SERVICE_PORT || 3011);

app.get("/health", (_req, res) => {
  res.json({
    service: "quote-service",
    status: "ok",
  });
});

app.get("/quote", async (_req, res) => {
  try {
    const response = await fetch(`${process.env.PROFILE_SERVICE_URL}/profile`);

    if (!response.ok) {
      throw new Error(`profile-service returned ${response.status}`);
    }

    const payload = await response.json();
    const hero = payload.hero;

    res.json({
      service: "quote-service",
      quote: `${hero.name}, ${hero.role}, dit: "${hero.motto}"`,
      sourceService: payload.service,
    });
  } catch (error) {
    res.status(500).json({
      service: "quote-service",
      status: "error",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Quote service running on port ${port}`);
});
