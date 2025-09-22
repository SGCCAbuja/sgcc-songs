/* eslint-disable @typescript-eslint/no-require-imports */

const songs = require("../app/data/songs.json");

const baseUrl = "https://songs.sgcc.ng";

const staticPages = [{ path: "", changefreq: "yearly" }];

const urls = staticPages.map((page) => ({
  loc: `${baseUrl}/${page.path}`,
  changefreq: page.changefreq,
}));

songs.forEach((song) => {
  urls.push({
    loc: `${baseUrl}/song/${song.id}`,
    changefreq: "weekly",
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, changefreq }) => `
  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
`
  )
  .join("")}
</urlset>`;

const fs = require("fs");
fs.writeFileSync("public/sitemap.xml", sitemap);
console.log("✅ sitemap.xml generated successfully!");
