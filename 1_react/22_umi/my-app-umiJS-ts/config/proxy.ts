/* 配置代理 */
export default {
  'dev': {
    '/api': {
      target: "https://preview.pro.ant.design",
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' }
    }
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
}