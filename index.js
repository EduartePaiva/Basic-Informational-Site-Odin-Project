const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer(async (req, res) => {
    try {
        if (req.method !== "GET") {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(await fs.readFile("./404.html", "utf-8"));
            return;
        }

        switch (req.url) {
            case "/":
                res.end(await fs.readFile("./index.html", "utf-8"));
                break;
            case "/about":
                res.end(await fs.readFile("./about.html", "utf-8"));
                break;
            case "/contact-me":
                res.end(await fs.readFile("./contact-me.html", "utf-8"));
                break;
            default:
                console.log("veio aqui");
                const cnt = await fs.readFile("./404.html", "utf-8");
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end(cnt);
        }
        return;
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end("internal server error");
        return;
    }
});

server.listen(3000, "localhost", () => {
    console.log("Server is running on http://localhost:3000");
});
