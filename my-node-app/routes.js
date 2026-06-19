const https = require("https");

// SAFE BODY PARSER
function getBody(req) {
  return new Promise((resolve) => {
    let data = "";

    req.on("data", (chunk) => (data += chunk));

    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch {
        resolve({});
      }
    });
  });
}

module.exports = {
  // ================= LOGIN =================
  login: async (req, res) => {
    const body = await getBody(req);

    if (body.username === "admin" && body.password === "1234") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false }));
    }
  },

  // ================= COUNTRIES (FIXED 100%) =================
  countries: (req, res, parsedUrl) => {
    const parts = parsedUrl.pathname.split("/");
    const region = parts[3];

    https.get(
      `https://restcountries.com/v3.1/region/${region}`,
      (apiRes) => {
        let data = "";

        apiRes.on("data", (chunk) => (data += chunk));

        apiRes.on("end", () => {
          try {
            const json = JSON.parse(data);

            // ALWAYS RETURN ARRAY
            if (!Array.isArray(json)) {
              res.writeHead(200, { "Content-Type": "application/json" });
              return res.end(JSON.stringify([]));
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(json));
          } catch {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify([]));
          }
        });
      }
    ).on("error", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify([]));
    });
  },

  // ================= WEATHER =================
  weather: (req, res) => {
    https.get(
      "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true",
      (apiRes) => {
        let data = "";

        apiRes.on("data", (chunk) => (data += chunk));

        apiRes.on("end", () => {
          try {
            const json = JSON.parse(data);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(json));
          } catch {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ current_weather: null }));
          }
        });
      }
    ).on("error", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ current_weather: null }));
    });
  }
};