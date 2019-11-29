const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  // 是否为生产环境构建生成 source map？

  productionSourceMap: false,
  chainWebpack: config => {
    config.module.rules.delete('svg'); //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/images/svg')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 把px单位换算成rem单位
            rootValue: 37.5,
            unitPrecision: 5, // 最小精度，小数点位数
            propList: ['*'], // !不匹配属性（这里是字体相关属性不转换）
            selectorBlackList: [],
            minPixelValue: 2, // 替换的最小像素值
          }),
        ],
      },
    },
  },
  // webpack-dev-server 相关配置
  devServer: {
    proxy: {
      '/webapp': {
        target: 'https://hipigoo.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/webapp': '/',
        },
      },
    },
  },
};
