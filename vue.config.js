const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  // 是否为生产环境构建生成 source map？

  productionSourceMap: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境...
    } else {
      // 为开发环境修改配置...
    }
    config.module.rules.push({
      test: /\.(jsx|tsx|js|ts)$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'vant',
                  libraryDirectory: 'lib',
                  style: true,
                }),
              ],
            }),
            compilerOptions: {
              module: 'es2015',
            },
          },
        },
      ],
      exclude: /node_modules/,
    });
  },
  // 修改 Loader 选项
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
      '/api': {
        target: 'https://www.fastmock.site/mock/6d41e4a585f6e3529e633c2d4e78cbba',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
