// Navigation Plugin
// Source: https://www.11ty.dev/docs/plugins/navigation/

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

	// Navigation

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// ---------------------------
	// Passthrough Copy
	// ---------------------------

	// Copy the contents of a folder to the output folder.
	// For example, "./folder/": "/folder/" ends up in `_site/folder/`.

	eleventyConfig.addPassthroughCopy({
		"./assets/": "/assets/",
		"./media/": "/media/"
	});

	// ---------------------------
	// Configuration Options
	// ---------------------------

	return {
		// Directories
		dir: {
			input: "content",
			includes: "../_includes",
			output: "_site"
		}
	};

};
