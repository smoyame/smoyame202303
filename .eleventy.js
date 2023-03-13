module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/_assets");

	return {
		dir: {
			input: "src",
			output: "public",
			includes: "_includes/njk",
		},
		htmlTemplateEngine: "njk",
	};
};
