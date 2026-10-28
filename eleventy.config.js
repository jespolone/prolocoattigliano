const Image = require("@11ty/eleventy-img");
const today = require("./src/_data/today.js");

const prefix = process.env.PATH_PREFIX || "/";

const toISO = (d) => new Date(d).toISOString().slice(0, 10);
const lastDay = (item) => toISO(item.data.endDate || item.date);

async function eventImageShortcode(src, alt) {
  const localSrc = src.startsWith("/") ? "." + src : src;

  const metadata = await Image(localSrc, {
    widths: [480, 960],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/media/img/",
    urlPath: prefix + "media/img/",
    sharpJpegOptions: { quality: 82, progressive: true },
    sharpWebpOptions: { quality: 80 },
  });

  return Image.generateHTML(metadata, {
    alt: alt || "",
    sizes: "(max-width: 700px) 100vw, 480px",
    loading: "lazy",
    decoding: "async",
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addAsyncShortcode("eventImage", eventImageShortcode);

  eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("isoDay", toISO);
  eleventyConfig.addFilter("dataLunga", (d) =>
    new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(d))
  );
  eleventyConfig.addFilter("giorno", (d) =>
    new Intl.DateTimeFormat("it-IT", { day: "numeric", timeZone: "UTC" }).format(new Date(d))
  );
  eleventyConfig.addFilter("meseBreve", (d) =>
    new Intl.DateTimeFormat("it-IT", { month: "short", timeZone: "UTC" }).format(new Date(d))
  );

  const eventi = (api) => api.getFilteredByGlob("src/eventi/*.md");
  eleventyConfig.addCollection("eventi", (api) => eventi(api));
  eleventyConfig.addCollection("eventiProssimi", (api) =>
    eventi(api)
      .filter((item) => lastDay(item) >= today)
      .sort((a, b) => a.date - b.date)
  );
  eleventyConfig.addCollection("eventiPassati", (api) =>
    eventi(api)
      .filter((item) => lastDay(item) < today)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ media: "media" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    pathPrefix: prefix,
  };
};
