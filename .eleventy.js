module.exports = function (eleventyConfig) {
	// Return your Object options:
	return {
		dir: {
			input: "src",
			output: "public",
			includes: "_includes/njk",
		},
		htmlTemplateEngine: "njk",
	};
};
