"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetaData = void 0;
const http_1 = __importDefault(require("http"));
// /*
// implement your server code here
// */
// const server: Server = http.createServer(
//   (req: IncomingMessage, res: ServerResponse) => {
//     if (req.method === "GET") {
//       res.end(JSON.stringify({ name: "hello" }));
//     }
//   }
// );
// server.listen(3001);
const puppeteer_1 = __importDefault(require("puppeteer"));
// import http from "http";
const url_1 = __importDefault(require("url"));
const targetUrl = "https://www.google.com/maps/@6.4355126,3.5437504,15z?entry=ttu";
async function getMetaData(url) {
    // const browser = await puppeteer.launch({ headless: true });
    const browser = await puppeteer_1.default.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    const metaData = await page.evaluate(() => {
        const metaTags = document.querySelectorAll('meta[property^="og:"]');
        const data = {};
        metaTags.forEach((tag) => {
            const property = tag.getAttribute("property");
            const content = tag.getAttribute("content");
            if (property && content) {
                if (property === "og:image") {
                    data.image = content;
                }
                else if (property === "og:description") {
                    data.description = content;
                }
                else if (property === "og:title") {
                    data.title = content;
                }
            }
        });
        return data;
    });
    await browser.close();
    return metaData;
}
exports.getMetaData = getMetaData;
const server = http_1.default.createServer((req, res) => {
    const parsedUrl = url_1.default.parse(req.url || "", true);
    if (parsedUrl.pathname === "/metadata") {
        // Handle metadata request
        getMetaData(targetUrl)
            .then((metaData) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(metaData));
        })
            .catch((error) => {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(`Error: ${error.message}`);
        });
    }
    else {
        // Handle other requests
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});
const PORT = 3005;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = { getMetaData: getMetaData };
