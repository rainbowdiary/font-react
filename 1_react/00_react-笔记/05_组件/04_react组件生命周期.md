# 谈谈生命周期函数（几个阶段，分别有什么, 重要的钩子）?
## 旧生命周期:(了解即可)
## 新生命周期

* 参考文档:
  * https://reactjs.bootcss.com/docs/react-component.html

1)组件的三个生命周期状态:
 * 初始挂载化阶段：第一次渲染，插入真实DOM
 * 更新阶段：重新渲染
 * 卸载阶段：被移出真实 DOM   

2)生命周期流程:

a.初始化挂载阶段:  由ReactDOM.render()触发
  * constructor()
  * static getDerivedStateFromProps(props,state) 
  * render()                               
  * componentDidMount()
b.更新阶段 由组件内部this.setSate()或父组件重新render触发
   * static getDerivedStateFromProps(props,state)
   * shouldComponentUpdate()
   * render()
   * getSnapshotBeforeUpdate()
   * componentDidUpdate()
c.移除组件:  
      由ReactDOM.unmountComponentAtNode(containerDom)触发
    * componentWillUnmount()

## 重要的勾子
1) render: 初始化渲染或更新渲染调用
2) componentDidMount: 发送ajax请求/设置定时器/一次性操作
3) shouldComponentUpdate 性能优化:减少重新渲染次数,对比新旧props和state差异,只要一个不一样就更新,全部一样就不更新
4) componentWillUnmount: 做一些收尾工作, 如: 清理定时器,取消ajax请求
5) static getDerivedStateFromProps: 
    - 子组件的state是根据父组件传递的props来生成的那就需要借助这个函数
    - (返回一个对象，更新后的状态数据)
    - (static静态方法，是类上的方法，使用类可以直接调用，而不是实例化类的方法，里面不能拿到this)

## 即将废弃的勾子
1)UNSAFE_componentWillMount()
2)UNSAFE_componentWillReceiveProps()
3)UNSAFE_componentWillUpdate()

现在使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，下下个版本会被彻底废弃，不建议使用。

1. 生命周期函数this指向实例对象
2. 在实例对象的隐式原型上


# 生命周期内部等抛出错误处理
  1. 两个专门处理错误边界的生命周期函数（当渲染过程，生命周期，或子组件的构造函数抛出错误）
     1. **static getDerivedStateFromError(error)**
     2. **componentDidCatch(info, error)**
   

