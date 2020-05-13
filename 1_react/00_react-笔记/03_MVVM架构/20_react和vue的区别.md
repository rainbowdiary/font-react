# react和vue有什么区别吗？你可以这样说！

引出mvc和mvvm的概念。
讲解react和vue的底层思想。
说出他们的优点和缺点。
实践：你在xx项目中，因为xx问题所以选择xx框架。
最后说出结论。

例如作者自己对这个问题的解答如下：

1). mvc和mvvm具体是指xxxxxxx，他们的区别是xxxx，各方的优缺点xxxx。
  https://baijiahao.baidu.com/s?id=1596277899370862119&wfr=spider&for=pc
  
  * MVVM（前端架构）: 
    - M: Model 模型
    - V: View  视图
    - VM: ViewModel 视图模型，是连接view和model的桥梁

    * 两个方向数据传递: 
      1. 【模型】转化为【视图】
         1. 将后台传递的数据转化为看到的页面
         2. 通过数据绑定实现
      2. 【视图】转化为【模型】
         1. 将页面转化为后台数据
         2. 通过DOM事件监听实现
    - 两个方向都实现称为【双向数据绑定】
    - 在MVVM架构下视图和模型是不能直接通信额，他通过ViewModel来通信
  
  * MVC（后端架构）:
    - M: Model 模型
    - V: View  视图
    - C: Controller 控制器 页面业务逻辑
  - 特点：
    - 使用MVC架构是为了将M和V的代码分离
    - MVC是单向通信；View ->  Controller -> Model

  * 为什么会有MVVM架构? 
    早期后台有MVC架构，但是前端没有，产生很多后台代码在浏览器上，出现很多兼容性问题，jquery
    但是由于代码可扩展性，可维护性比较差，才出现了MVVM架构，通过数据的双向绑定，大大提高了开发效率
    VUE就是基于MVV模型实现的一个架构
      M: 指js中的数据，比如对象，数组等 V:指的是页面视图 viewModel： vue的实例对象   
      vue数据双向绑定: https://cn.vuejs.org/v2/guide/reactivity.html


2). vue的底层是用xxxx实现的，另外碰到数组的话因为有xx缺陷，vue的底层是重写了关于数组的八个函数等等。
3). react的jsx功能强大，灵活性强，但是代码必须要规范，每个人都有自己的代码风格。
4). 因为项目的迭代更新很快，便于多人开发，所以我选择的是xx框架。
其实用任何框架都要根据真实环境下的各种因素结合，并不是哪个框架就是强无敌，拿起来直接黏贴复制一把梭的。

作者：Kev1nzh
链接：https://juejin.im/post/5ca6fd2f6fb9a05e643def4f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。