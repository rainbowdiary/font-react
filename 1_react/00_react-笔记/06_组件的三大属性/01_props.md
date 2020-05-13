## props

   1. 组件外向组件内传递变化的数据
   2. 组件上的属性
   3. 定义props类型的约束

      1. 使用指定的库
      2. propType,defaultProps
      3. 给类添加属性,而不是实例对象

  ```
  class Hello extends React.Component {
    render() {
      return <div>Hello {this.props.toWhat}</div>;
    }
  }

  ReactDOM.render(
    <Hello toWhat="World" />,
    document.getElementById('root')
  );
  ```

# 属性**props.children**
  * 每个组件都可以获取到props.children
  * 它包含组件的开始标签和结束标签之间的内容 
  * 目的： 为了解决React中代码复用的问题
    * 参考： 使用组合模式实现代码复用
      * https://reactjs.bootcss.com/docs/composition-vs-inheritance.html
  ```
  <Welcome>Hello world!</Welcome>
  ```
  对于 class 组件，请使用 this.props.children 来获取：
  ```
  class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}```



## defaultProps
为Class类组件提供默认的props属性
用于props未赋值，且不能为null的情况

  ```
  class CustomButton extends React.Component {
    // ...
  }

  CustomButton.defaultProps = {
    color: 'blue'
  };
  ```
//如果未提供 props.color，则默认设置为 'blue'

 ```
  render() {
    return <CustomButton /> ; // props.color 将设置为 'blue'
  }
 ```

如果 props.color 被设置为 null，则它将保持为 null

  ```
  render() {
      return <CustomButton color={null} /> ; // props.color 将保持是 null
    }
  ```