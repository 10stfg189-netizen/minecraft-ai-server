const http = require("http");

const server = http.createServer((req, res) => {
res.setHeader("Content-Type", "application/json; charset=utf-8");
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
res.writeHead(204);
return res.end();
}

if (req.url === "/health" && req.method === "GET") {
res.writeHead(200);
return res.end(JSON.stringify({
status: "online",
name: "Minecraft AI Companion"
}));
}

if (req.url === "/chat" && req.method === "POST") {
let body = "";

req.on("data", chunk => {
  body += chunk;
});

req.on("end", () => {
  try {
    const data = JSON.parse(body);

    res.writeHead(200);
    res.end(JSON.stringify({
      reply: "Aku mendengarmu! Otak AI-ku belum dipasang. Pesanmu: " +
        String(data.message || "")
    }));
  } catch {
    res.writeHead(400);
    res.end(JSON.stringify({
      error: "Format pesan tidak valid"
    }));
  }
});

return;

}

res.writeHead(404);
res.end(JSON.stringify({ error: "Not found" }));
});

const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", () => {
console.log("Minecraft AI Companion berjalan di port " + port);
});
