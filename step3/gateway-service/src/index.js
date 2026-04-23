const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.GATEWAY_PORT || 3012);

app.get("/", (_req, res) => {
  res.json({
    service: "gateway-service",
    status: "ready",
    hint: "Appelle /verification pour tester toute l'architecture.",
  });
});

app.get("/verification", async (_req, res) => {
  try {
    const [profileResponse, quoteResponse] = await Promise.all([
      fetch(`${process.env.PROFILE_SERVICE_URL}/profile`),
      fetch(`${process.env.QUOTE_SERVICE_URL}/quote`),
    ]);

    if (!profileResponse.ok) {
      throw new Error(`profile-service returned ${profileResponse.status}`);
    }

    if (!quoteResponse.ok) {
      throw new Error(`quote-service returned ${quoteResponse.status}`);
    }

    const profile = await profileResponse.json();
    const quote = await quoteResponse.json();

    res.json({
      step: "step3",
      status: "success",
      finalMessage:
        process.env.FINAL_MESSAGE ||
        "Bravo, ton architecture microservices Docker fonctionne de bout en bout.",
      profile,
      quote,
    });
  } catch (error) {
    res.status(500).json({
      step: "step3",
      status: "error",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Gateway service running on port ${port}`);
});
