const https = require("https");
const axios = require("axios");


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

  // ================= COUNTRIES =================


// countries: (req, res, parsedUrl) => {
//     const parts = parsedUrl.pathname.split("/");
//     const region = parts[3];
//     console.log("COUNTRIES API CALLED");
//     console.log("Region:", region);


//     https.get(
//       `https://restcountries.com/v3.1/region/${region}`,
//       (apiRes) => {
//         let data = "";

//         apiRes.on("data", (chunk) => (data += chunk));

//         apiRes.on("end", () => {
//           try {
//             const json = JSON.parse(data);

//             // ALWAYS RETURN ARRAY
//             if (!Array.isArray(json)) {
//               res.writeHead(200, { "Content-Type": "application/json" });
//               return res.end(JSON.stringify([]));
//             }
//             const filtered = data.filter(
//               (c) => c.region?.toLowerCase() === region
//             );
      
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify(json));
//           } catch {
//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify([]));
//           }
//         });
//       }
//     ).on("error", () => {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify([]));
//     });
//   },

// countries: (req, res, parsedUrl) => {
//   const parts = parsedUrl.pathname.split("/");
//   const region = parts[3];

//   console.log("COUNTRIES API CALLED");
//   console.log("Region:", region);

//   https.get(
//     `https://restcountries.com/v3.1/region/${region}`,
//     (apiRes) => {
//       let data = "";

//       apiRes.on("data", (chunk) => (data += chunk));

//       apiRes.on("end", () => {
//         try {
//           const json = JSON.parse(data);

//           if (!Array.isArray(json)) {
//             res.writeHead(200, { "Content-Type": "application/json" });
//             return res.end(JSON.stringify([]));
//           }

//           const filtered = json.filter(
//             (c) => c.region?.toLowerCase() === region.toLowerCase()
//           );

//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.end(JSON.stringify(filtered));

//         } catch (err) {
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.end(JSON.stringify([]));
//         }
//       });
//     }
//   ).on("error", () => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify([]));
//   });
// },




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

          if (!Array.isArray(json)) {
            return res.end(JSON.stringify([]));
          }

          // 🔥 IMPORTANT: transform data properly
          const result = json.map((c) => ({
            name: c.name?.common,
            population: c.population,
            region: c.region,
            code: c.cca3
          }));

          res.writeHead(200, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify(result));

        } catch (err) {
          res.end(JSON.stringify([]));
        }
      });
    }
  ).on("error", () => {
    res.end(JSON.stringify([]));
  });
},

countries: (req, res, parsedUrl) => {
  console.log("\n==============================");
  console.log("🚀 COUNTRIES API HIT");

  // 1️⃣ Check full path
  console.log("📍 PATH:", parsedUrl.pathname);

  const parts = parsedUrl.pathname.split("/");
  console.log("📦 PATH PARTS:", parts);

  // 2️⃣ Extract region safely
  const region = parts[3] || "asia";
  console.log("🌍 REGION:", region);

  // 3️⃣ API URL
  const url = `https://restcountries.com/v3.1/region/${region}`;
  console.log("📡 CALLING:", url);

  https
    .get(url, (apiRes) => {
      let data = "";

      console.log("⏳ Waiting for API response...");

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        console.log("📥 RAW DATA RECEIVED");

        try {
          const json = JSON.parse(data);

          console.log("📊 PARSED DATA TYPE:", typeof json);
          console.log("📊 IS ARRAY:", Array.isArray(json));

          if (!Array.isArray(json)) {
            console.log("⚠️ API did not return array");
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify([]));
          }

          console.log("📊 TOTAL COUNTRIES:", json.length);

          // 4️⃣ Transform data
          const result = json.map((c) => ({
            name: c.name?.common,
            population: c.population,
            region: c.region,
            code: c.cca3
          }));

          console.log("✅ TRANSFORMED SAMPLE:", result[0]);

          // 5️⃣ Send response
          res.writeHead(200, {
            "Content-Type": "application/json"
          });

          console.log("🚀 RESPONSE SENT SUCCESSFULLY");
          res.end(JSON.stringify(result));
        } catch (err) {
          console.log("❌ JSON PARSE ERROR:", err.message);

          res.writeHead(200, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify([]));
        }
      });
    })
    .on("error", (err) => {
      console.log("❌ HTTPS ERROR:", err.message);

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

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
  },


};
