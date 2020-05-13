/* const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require("customize-cra");

module.exports = {
  webpack: override(
    //配置按需加载
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    // 使用less模块
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#4d9f84" }
    }),
    //简化高阶组件的使用
    addDecoratorsLegacy()
  )
} */


const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require("customize-cra");

module.exports = {
  webpack: override(
    //配置按需加载
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    // 使用less模块
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#4d9f84" }
    }),
    //简化高阶组件的使用
    addDecoratorsLegacy()
  )
} 