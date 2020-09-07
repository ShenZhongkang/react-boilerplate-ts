const ProgressBar = require('progress-bar-webpack-plugin');
const AntdLess = require('craco-antd');
// const aliyunTheme = require('@ant-design/aliyun-theme');

module.exports = {
  webpack: {
    plugins: [new ProgressBar()],
  },
  plugins: [
    // 自定义 antd 主题
    {
      plugin: AntdLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: {
            //   // '@primary-color': 'green', // less变量定义
            //   // hack: `true; @import "${path.resolve(process.cwd(), 'src/styles/theme')}"`, // 独立less文件定义
            // },
            // modifyVars: aliyunTheme,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
