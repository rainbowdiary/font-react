# antd按需加载环境 
yarn add antd react-app-rewired customize-cra babel-plugin-import

```
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "react-app-rewired start",
+   "build": "react-app-rewired build",
+   "test": "react-app-rewired test",
}
```

然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

```config-overrides.js
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('antd', {
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```


```
 // src/App.js
  import React, { Component } from 'react';
- import Button from 'antd/es/button';
+ import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }
  export default App;
```

最后重启 yarn start 访问页面，antd 组件的 js 和 css 代码都会按需加载，你在控制台也不会看到这样的警告信息。关于按需加载的原理和其他方式可以阅读这里。