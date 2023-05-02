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
		"./node_modules/prismjs/themes/prism-okaidia.css": "/assets/css/prism-okaidia.css"
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
