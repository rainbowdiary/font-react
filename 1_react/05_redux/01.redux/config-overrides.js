const { override, addDecoratorsLegacy } = require("customize-cra");

module.exports = {
  webpack: override(
    //简化高阶组件的使用
    addDecoratorsLegacy()
  )
} 