import { getMetaData } from "../server2/app.js";

describe("Web Scraping App", () => {
  test("should extract meta data correctly", async () => {
    const targetUrl =
      "https://www.google.com/maps/@6.4301395,3.5509173,15z?entry=ttu";
    const metaData = await getMetaData(targetUrl);
    console.log("Image URL:", metaData.image);
    console.log("Description:", metaData.description);
    console.log("Title:", metaData.title);
  }, 10000);
});
