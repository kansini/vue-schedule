module.exports = {
	publicPath: './',
	//runtimeCompiler: true,

	css: {
		loaderOptions: {
			sass: {
				prependData: '@import "@/assets/scss/index.scss";'
			}
		}
	}
}
