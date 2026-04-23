const express = require("express");
const dotenv = require("dotenv");
const { spawnSync } = require("node:child_process");

dotenv.config();

const app = express();

const port = Number(process.env.PORT || 3001);
const verificationMessage =
  process.env.VERIFICATION_MESSAGE ||
  "Bravo, ton premier conteneur Docker fonctionne.";
const requiredBinary = process.env.REQUIRED_BINARY || "curl";

function resolveBinaryVersion(binaryName) {
  const result = spawnSync(binaryName, ["--version"], {
    encoding: "utf8",
  });

  if (result.error || result.status !== 0) {
    return null;
  }

  return (result.stdout || result.stderr || "").split("\n")[0].trim();
}

const binaryVersion = resolveBinaryVersion(requiredBinary);

if (!binaryVersion) {
  console.error(
    `Le binaire systeme "${requiredBinary}" est introuvable. ` +
      "Installe-le dans ton image Docker avant de lancer l'application."
  );
  process.exit(1);
}

app.get("/", (_req, res) => {
  res.json({
    step: "step1",
    status: "ready",
    hint: "Appelle /verification pour confirmer que ton Dockerfile fonctionne.",
  });
});

app.get("/verification", (_req, res) => {
  res.json({
    step: "step1",
    status: "success",
    message: verificationMessage,
    binary: requiredBinary,
    binaryVersion,
  });
});

app.listen(port, () => {
  console.log(`Step 1 running on port ${port}`);
});
