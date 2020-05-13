## react组件
定义组件方式:
   1. 工厂函数(返回虚拟DOM对象)this是undefined

      1. 定义简单组件(无状态和无生命周期函数)
      ```
      <script type="text/babel">
        function Text(){
          return (<h1>hello component</h1>)
        }
      ReactDOM.render(<MyComponent/>,document.getElementById('example1'));
      </script>
      ```

   2. ES6类组件

      1. 复杂组件(有状态和无生命周期函数)
      ```
      <script type="text/babel">
        class MyComponent extends React.Component{
          render(){
            console.log(this);
            return (<h1>hello component</h1>)
          }
        }
      // 将组件渲染到页面指定容器中
      ReactDOM.render(<MyComponent/>,document.getElementById('example2'));
      </script>

      ```

###  定义组件的注意事项:  
  1. 组件必须有结束符
    双标签
    自结束单标签
  2. 组件名首字符必须大写  
  3. 必须有且只有一个根标签


### 组件文件夹命名

  小写, 中划线连接