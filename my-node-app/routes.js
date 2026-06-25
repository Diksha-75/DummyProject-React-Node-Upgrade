const https = require("https");
const axios = require("axios");
const url = require("url");


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
     console.log("LOGIN HIT");
    const body = await getBody(req);

    if (body.username === "admin" && body.password === "1234") {
      console.log("BODY:", body);
      console.log("LOGIN SUCCESS");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
    } else {
      console.log("LOGIN FAILED");

      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false }));
    }
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
  },
//===========================AIR-QUALITY-CHECKER============================

aqi: (req, res, parsedUrl) => {
  const parts = parsedUrl.pathname.split("/");
  const city = parts[3] || "mumbai";

  const TOKEN = "a8b272ab301f423b5c74c1e09d43df3ffbcd163e"; 

  console.log("AQI API CALLED");
  console.log("City:", city);

  https.get(
    `https://api.waqi.info/feed/${city}/?token=${TOKEN}`,
    (apiRes) => {
      let data = "";

      console.log("⏳ Waiting for AQI response...");

      apiRes.on("data", (chunk) => (data += chunk));

      apiRes.on("end", () => {
        try {
          const json = JSON.parse(data);

          console.log("AQI:", json?.data?.aqi);

          const result = {
            city: city,
            aqi: json?.data?.aqi || null,
          };

          res.writeHead(200, {
            "Content-Type": "application/json",
          });

          res.end(JSON.stringify(result));
        } catch (err) {
          console.log("AQI PARSE ERROR:", err.message);

          res.writeHead(200, {
            "Content-Type": "application/json",
          });

          res.end(
            JSON.stringify({
              city,
              aqi: null,
            })
          );
        }
      });
    }
  ).on("error", (err) => {
    console.log("AQI API ERROR:", err.message);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        city,
        aqi: null,
      })
    );
  });
},
  

};
