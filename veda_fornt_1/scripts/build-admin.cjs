/**
 * Production: install + build veda_admin, copy dist → public/vidaAdmin.
 * Set PUBLIC_APP_URL (e.g. https://yourdomain.com) so admin calls the right /api.
 * On Vercel, defaults to https://VERCEL_URL when PUBLIC_APP_URL is unset.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const frontRoot = path.join(__dirname, "..");
const adminRoot = path.join(frontRoot, "..", "veda_admin");

const publicAppUrl =
  process.env.PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

if (!publicAppUrl) {
  console.warn(
    "[build-admin] PUBLIC_APP_URL not set (and not on Vercel); using http://127.0.0.1:5000 for admin API base"
  );
}

const origin = (publicAppUrl || "http://127.0.0.1:5000").replace(/\/$/, "");
const apiUrl = `${origin}/api`;

if (!fs.existsSync(path.join(adminRoot, "package.json"))) {
  console.error("[build-admin] Missing veda_admin next to repo root.");
  process.exit(1);
}

execSync("npm ci", { cwd: adminRoot, stdio: "inherit" });
execSync("npm run build", {
  cwd: adminRoot,
  stdio: "inherit",
  env: { ...process.env, VITE_REACT_APP_AUTH_SERVICE: apiUrl },
});

const dist = path.join(adminRoot, "dist");
const target = path.join(frontRoot, "public", "vidaAdmin");
fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(dist, target, { recursive: true });
console.log("[build-admin] Copied admin → public/vidaAdmin");
