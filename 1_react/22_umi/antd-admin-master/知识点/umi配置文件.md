```
// https://umijs.org/config/
import { resolve } from 'path'
import { i18n } from './src/utils/config'

export default {
  publicPath: 'https://cdn.antd-admin.zuiidea.com/', //指向静态资源文件所在的路径
  hash: true,
  ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少尺寸。
  targets: { ie: 9 },
  treeShaking: true,
  plugins: [
    [
      // https://umijs.org/plugin/umi-plugin-react.html
      'umi-plugin-react', //插件包路径
      {      //插件参数
        dva: { immer: true }, //是否启用 dva-immer
        antd: true, //配置后无需手动安装即可按需加载
        dynamicImport: { //实现路由级的动态加载（code splitting），可按需指定哪一级的按需加载。
          webpackChunkName: true,
          loadingComponent: './components/Loader/Loader', //指定加载时的组件路径
        },
        routes: { // umi-plugin-routes 实现，用于批量修改路由。
          exclude: [ //忽略路由
            /model\.(j|t)sx?$/, 
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
            /chart\/Container\.js$/,
            /chart\/ECharts\/.+Component\.js$/,
            /chart\/ECharts\/.+ComPonent\.js$/,
            /chart\/ECharts\/theme\/.+\.js$/,
            /chart\/highCharts\/.+Component\.js$/,
            /chart\/highCharts\/mapdata\/.+\.js$/,
            /chart\/Recharts\/.+Component\.js$/,
            /chart\/Recharts\/Container\.js$/,
          ],
          update: routes => { // 更新路由
            if (!i18n) return routes

            const newRoutes = []
            for (const item of routes[0].routes) {
              newRoutes.push(item)
              if (item.path) {
                newRoutes.push(
                  Object.assign({}, item, {
                    path:
                      `/:lang(${i18n.languages
                        .map(item => item.key)
                        .join('|')})` + item.path,
                  })
                )
              }
            }

            <!-- { 
              path: /:lang(pt-br|en|zh)/user, exact: true, component: './src/pages/user/index.js',
              } -->
            routes[0].routes = newRoutes //加上了语言路径 ==》/:lang(pt-br|en|zh)/user

            return routes
          },
        },
        dll: {//预打包这些库，实现二次提升打包速度
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        pwa: {
          manifestOptions: { //icon图标放在public下，最终会被拷贝到构建目录
            srcPath: 'manifest.json',
          },
        },
      },
    ],
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: './config/theme.config.js',     配置主题，实际上是配 less 变量。支持对象和字符串两种类型，
  // Webpack Configuration
  proxy: {
    '/api/v1/weather': {
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/weather': '/v3/weather' },
    },
  },
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, './src/services'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
  extraBabelPresets: ['@lingui/babel-preset-react'],
  extraBabelPlugins: [  //定义额外的 babel plugin 列表，格式为数组。
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
  <!-- 通过 webpack-chain 的 API 扩展或修改 webpack 配置。 -->
  chainWebpack: function(config, { webpack }) {  
    config.merge({   //合并配置
      optimization: { 
        minimize: true, //代码压缩
        splitChunks: { //动态导入模块的优化
          chunks: 'all',  //选择哪些块进行优化（all:异步非异步块至今也可以共享块）
          minSize: 30000, //生成块的最小大小（字节）
          minChunks: 3,  //拆分钱必须共享模块的最小块数
          automaticNameDelimiter: '.', //指定用于生成名称的定界符。
          cacheGroups: {
            react: {
              name: 'react',   
              priority: 20,  //缓存组优先级
              test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,  控制缓存组选择的模块。
            },
            antd: {
              name: 'antd',
              priority: 20,
              test: /[\\/]node_modules[\\/](antd|@ant-design\/icons|@ant-design\/compatible|ant-design-pro)[\\/]/,
            },
            echarts: {
              name: 'echarts',
              priority: 20,
              test: /[\\/]node_modules[\\/]echarts|echarts-for-react|echarts-gl|echarts-liquidfill[\\/]/,
            },
            highcharts: {
              name: 'highcharts',
              priority: 20,
              test: /[\\/]node_modules[\\/](highcharts-exporting|highcharts-more|react-highcharts)[\\/]/,
            },
            recharts: {
              name: 'recharts',
              priority: 20,
              test: /[\\/]node_modules[\\/](recharts)[\\/]/,
            },
            draftjs: {
              name: 'draftjs',
              priority: 20,
              test: /[\\/]node_modules[\\/](draftjs-to-html|draftjs-to-markdown)[\\/]/,
            },
            async: {
              chunks: 'async',
              minChunks: 2,
              name: 'async',
              maxInitialRequests: 1,
              minSize: 0,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      },
    })
  },
}

```