# react脚手架
包名: react-create-app
脚手架所有配置: 
  在模块react-scripts (package.json)
  进行了很多模块化，提取了很多模块
  paths.js
  webpack.config.js

使用脚手架: 
- public
  - index.html
- src
  - index.js
      ```
      import React from 'react';
      import ReactDOM from 'react-dom';
      import App from './App';
      ReactDOM.render(<App />, document.getElementById('root'));
      ```
  - App.js    
   ```