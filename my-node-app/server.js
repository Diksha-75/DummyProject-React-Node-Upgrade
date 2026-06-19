const http = require("http");
const url = require("url");
const routes = require("./routes");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // ROOT TEST
  if (parsedUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Backend Running 🚀" }));
    return;
  }

  // LOGIN
  if (parsedUrl.pathname === "/api/login" && req.method === "POST") {
    return routes.login(req, res);
  }

  // COUNTRIES
  if (parsedUrl.pathname.startsWith("/api/countries")) {
    return routes.countries(req, res, parsedUrl);
  }

  // WEATHER
  if (parsedUrl.pathname === "/api/weather") {
    return routes.weather(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});