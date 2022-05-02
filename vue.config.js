module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    output: {
      filename: "[name].js",
      chunkFilename: "[name].chunk.js"
    },
  },
  css: {
    extract: {
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    }
  }
};
