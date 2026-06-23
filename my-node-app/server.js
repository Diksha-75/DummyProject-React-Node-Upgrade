

const http = require("http");
const url = require("url");
const routes = require("./routes");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (parsedUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Backend Running 🚀" }));
  }

  if (parsedUrl.pathname === "/api/login" && req.method === "POST") {
    return routes.login(req, res);
  }

  if (parsedUrl.pathname.startsWith("/api/countries")) {
    return routes.countries(req, res, parsedUrl);
  }

  if (parsedUrl.pathname === "/api/weather") {
    return routes.weather(req, res);
  }

  if (parsedUrl.pathname === "/api/launches") {
  return routes.launches(req, res);
}

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});