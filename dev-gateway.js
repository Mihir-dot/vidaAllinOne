/**
 * Single entry for local dev: http://localhost:8080
 *   /api/*, /get/image  → veda_backend (5000)
 *   /vidaAdmin/*        → veda_admin Vite (5173)
 *   /*                  → veda_fornt_1 Next (3001)
 */
const http = require("http");
const httpProxy = require("http-proxy");

const GATEWAY_PORT = parseInt(process.env.GATEWAY_PORT || "8080", 10);
const BACKEND = process.env.VEDA_BACKEND_URL || "http://127.0.0.1:5000";
const ADMIN = process.env.VEDA_ADMIN_URL || "http://127.0.0.1:5173";
const FRONT = process.env.VEDA_FRONT_URL || "http://127.0.0.1:3001";

const proxy = httpProxy.createProxyServer({
  ws: true,
  xfwd: true,
  changeOrigin: true,
});

proxy.on("error", (err, _req, res) => {
  console.error("[gateway] proxy error:", err.message);
  if (res && !res.headersSent && typeof res.writeHead === "function") {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad gateway — is backend (5000), admin (5173), and front (3001) running?");
  }
});

function routeToBackend(url) {
  return url.startsWith("/api") || url.startsWith("/get/image");
}

function routeToAdmin(url) {
  return (
    url.startsWith("/vidaAdmin") ||
    url.startsWith("/@vite") ||
    url.startsWith("/@id") ||
    url.startsWith("/@fs") ||
    url.startsWith("/node_modules/.vite")
  );
}

const server = http.createServer((req, res) => {
  const url = req.url || "";
  const target = routeToBackend(url)
    ? BACKEND
    : routeToAdmin(url)
      ? ADMIN
      : FRONT;
  proxy.web(req, res, { target });
});

server.on("upgrade", (req, socket, head) => {
  const url = req.url || "";
  const target = routeToAdmin(url) ? ADMIN : FRONT;
  proxy.ws(req, socket, head, { target });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `[gateway] Port ${GATEWAY_PORT} already in use — usually a previous "npm run dev" is still running.\n` +
        `  Stop it (Ctrl+C in that terminal), or:  fuser -k ${GATEWAY_PORT}/tcp\n` +
        `  Or use another port:  GATEWAY_PORT=8081 node dev-gateway.js`
    );
    process.exit(1);
  }
  throw err;
});

server.listen(GATEWAY_PORT, () => {
  console.log(
    `VEDA dev gateway → http://localhost:${GATEWAY_PORT}  (site /  admin /vidaAdmin/  API /api)`
  );
});
