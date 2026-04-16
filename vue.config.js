const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // publicPath: '/nostests/eboitepostalstaff/dist/',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  },

  chainWebpack: config => {
    // Configuration pour gérer les fichiers vidéo
    config.module
      .rule('video')
      .test(/\.(mp4|webm|ogg|mov|avi)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'videos/[name].[hash:8].[ext]'
      });
  }
});
