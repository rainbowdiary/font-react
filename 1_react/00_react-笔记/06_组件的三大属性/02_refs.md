# refs

   1. 获取DOM元素 
   2. 触发事件dom的元素是不是我想要的

      1. 不是想要的:使用refs获取
      2. 是,使用event.target获取

   3. 能不用就不用(React不推荐, 性能不好)
   4. React Diff优化DOM操作
   5. 如果给一个组件, 得到的是一个组件化的实例对象

* 什么是受控组件? 
  * 参考： https://reactjs.bootcss.com/docs/glossary.html
  - react获取表单输入的方式
  1. 受控组件: 如果input表单元素的值由React控制，就是受控组件。使用state和onChange事件获取
  2. 非受控组件: 使用ref获取