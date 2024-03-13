// Bundler
// Source: https://github.com/11ty/eleventy-plugin-bundle

const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");

// Paths for canonical URL

const path = require("path");

// Service Worker

const pluginPWA = require("eleventy-plugin-pwa-v2");

// Dates

const { DateTime } = require("luxon");

// Clean CSS Plugin
// Source: https://www.11ty.dev/docs/quicktips/inline-css/

const CleanCSS = require("clean-css");

// Navigation Plugin
// Source: https://www.11ty.dev/docs/plugins/navigation/

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// RSS Plugin
// Source: https://www.11ty.dev/docs/plugins/rss/

const pluginRss = require("@11ty/eleventy-plugin-rss");

// Syntax Highlighting Plugin
// Source: https://www.11ty.dev/docs/plugins/syntaxhighlight/

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Inclusive Language Plugin
// Source: https://www.11ty.dev/docs/plugins/inclusive-language/

const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = function(eleventyConfig) {

	// Cache Busting
	// Source: https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/

	eleventyConfig.addFilter("bust", (url) => {
		const [urlPart, paramPart] = url.split("?");
		const params = new URLSearchParams(paramPart || "");
		params.set("v", DateTime.utc().toISODate({ format: 'basic' }));
		return `${urlPart}?${params}`;
	});

	// Bundler

	eleventyConfig.addPlugin(bundlerPlugin);

	// Canonical URL Path

	eleventyConfig.addFilter("getbase", function (value) {
		const { dir } = path.parse(value);
		return dir + "/";
	});

	// Service Worker

	eleventyConfig.addPlugin(pluginPWA);

	// Dates

	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});

	eleventyConfig.addFilter("isoDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toISODate();
	});

	// Inline Minified CSS

	eleventyConfig.addFilter("cssmin", function(code) {
		return new CleanCSS({}).minify(code).styles;
	});

	// Navigation

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// RSS

	eleventyConfig.addPlugin(pluginRss);

	// Syntax Highlighting

	eleventyConfig.addPlugin(syntaxHighlight);

	// Inclusive Language

	eleventyConfig.addPlugin(inclusiveLangPlugin);

	// ---------------------------
	// Passthrough Copy
	// ---------------------------

	// Copy the contents of a folder to the output folder.
	// For example, "./folder/": "/folder/" ends up in `_site/folder/`.

	eleventyConfig.addPassthroughCopy({
		"./assets/": "/assets/",
		"./media/": "/media/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/assets/css/prism-okaidia.css",
		"./content/manifest.json": "./"
	});

	// ---------------------------
	// Custom Filtering
	// ---------------------------

	eleventyConfig.addCollection("selectedWork", function(collectionApi) {
		// Display only Selected Work
		return collectionApi.getFilteredByTags("project", "selected");
	});

	// ---------------------------
	// Configuration Options
	// ---------------------------

	return {
		// Directories
		dir: {
			input: "content",
			includes: "../_includes",
			data: "../_data",
			output: "_site"
		}
	};

};
