# 使用:
## 1.react库下载:
  * react.development.js
  * react-dom.development.js
  * babel.min.js
  
  ```
  <script type="text/babel">
    // 1. 创建虚拟DOM对象
        const vDom = <h1>hello React</h1>;
    // 2. 将虚拟DOM对象渲染到页面指定容器中
        ReactDOM.render(vDom, document.getElementById('test'));
  </script>
  ```

  seajs commonjs(浏览器不认识)
  1. umd
  2. react-dom(dom操作)依赖react,所以版本需要一致
  3. babel 将react语法解析成浏览器看得懂的语言 

## 2. jsx语法

(浏览器不识别, 需要babel编译, script的type="text/babel")

  * ReactDOM.render方法: 渲染将虚拟DOM对象渲染到页面指定容器中
  * jsx语法: Javascript XML

  1. 作用:简化创建虚拟DOM对象
     1. 每个 JSX 元素只是调用 React.createElement(component, props, ...children) 的语法糖
        1. 使用了jsx就不需要调用React API **createElement()**,**createFactory()**
  2. 语法规则:
  * 以<开头, 会当做html标签解析, 如果是同名标签或首字母小写就被解析同名元素, 如果不是或首字母大写会当成组件解析
  * 以{开头, 里面代码会当做js代码解析
  3. 变量:{}
  4. babel编译: 将jsx代码编译为原生的reac语法

练习:map方法, 数据遍历展示在页面上, 唯一key属性

