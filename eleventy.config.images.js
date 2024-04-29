const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

function relativeToInputPath(inputPath, relativeFilePath) {
	let split = inputPath.split("/");
	split.pop();

	return path.resolve(split.join(path.sep), relativeFilePath);
}

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

module.exports = function(eleventyConfig) {
	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, sizes) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		let input;
		if(isFullUrl(src)) {
				input = src;
		} else {
				input = relativeToInputPath(this.page.inputPath, src);
		}

		let outputDir, widths, formats;

		if (src.includes("notes")) {

			outputDir = path.join(eleventyConfig.dir.output, "notes/");
			widths = [500, 1000];
			formats = ["jpg", "jpeg", "webp"];

		} else {

			outputDir = path.join(eleventyConfig.dir.output, "work/");

			if (src.includes("-logo.svg")) {

				widths= [50];
				formats = ["svg"];

			} else if (src.includes("-banner.png")) {

				widths = [500, 1000];
				formats = ["png"];

			} else if (src.includes("-large.jpg")) {

				widths = [500, 1000];
				formats = ["jpg", "webp"];

			} else if (src.includes("-medium.jpg")) {

				widths = [500];
				formats = ["jpg", "webp"];

			} else {

				widths = [320];
				formats = ["jpg", "webp"];

			}

		}

		let metadata = await eleventyImage(input, {
				widths,
				formats,
				outputDir, // use the outputDir based on the condition
				urlPath: outputDir.replace(eleventyConfig.dir.output, "/media/"),
		});

		// TODO: loading=eager and fetchpriority=high
		let imageAttributes = {
				alt,
				sizes,
				loading: "lazy",
				decoding: "async",
		};

		return eleventyImage.generateHTML(metadata, imageAttributes);
});
};
