module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    output: {
      filename: "js/[name].js",
      chunkFilename: "js/[name].js"
    },
  },
  css: {
    extract: {
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    }
  }
};
