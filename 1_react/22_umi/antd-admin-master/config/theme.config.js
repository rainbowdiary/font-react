/* .umirc.js主题配置 */
const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js') //从文件的内容中读取LESS变量，并将其作为javascript对象返回

module.exports = () => {
  const themePath = path.join(__dirname, '../src/themes/default.less')
  return lessToJs(fs.readFileSync(themePath, 'utf8'))
}
