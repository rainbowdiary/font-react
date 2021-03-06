# 虚拟DOM Diff算法(面试题)
概念:
1)什么是虚拟DOM?
  虚拟DOM就是一个js对象，用来存储真实DOM元素的信息。与真实DOM的映射
2)什么是虚拟DOM Diff算法？
  一种更新的时候,对比新/旧虚拟DOM树的高效算法，能快速计算哪些虚拟DOM树发生了变化，从而只更新局部DOM。
3)作用?
  以保证组件满足更新具有可预测性，以及在繁杂业务下依然保持应用的高性能性。

1. 因为页面的跨层级节点移动的操作特别少,因此提出对比优化手段tree Diff算法
2. 相同组件的结构大体相似,不同组件的结构往往不同,因此提出优化手段component Diff算法
3. 给同级的子节点添加唯一的key属性 提出的优化手段是element diff
* tree diff
  * 1. 当根节点为不同类型的元素
      * 拆卸原来的树并建立新的树
      * 根节点下所有组件和内容全部被销毁
      * 拆卸一棵树，DOM节点被销毁，组件实例将执行componentWillUnMount
	* 2. 对比同一类型的元素。 
		* 如果类型一样，React会保留DOM节点,对比属性、继续递归子节点
      ```
      <div className="before" title="stuff"/>
      <div className="after" title="stuff"/>
      ```
		* 如果不一样，就全部干掉，生成新的节点
* component diff
	* 如果组件类型相同，在对比细节（属性、子节点等）
	* 如果组件类型不相同，整个组件干掉，生成新组件
* element diff
	* A B C D --> D A B C
		* 正常走tree diff。 A和D对比、B和A对比...发现全都不一样。全部干掉生成新的（不好）。
		* 给其添加一个唯一的key属性，就走element diff。 先看key

* key有什么作用?
  * 能让diff 算法性能更好
  * 什么时候用id/index
    * id是通用,能用就用
    * index只适用于给列表末尾添加的数据,如果顺序改变或者删除元素使用index作为key值性能就不好了

* 作用:
  最小化页面重排重绘
  减少重排重绘的次数,收集变化,一次性重排重绘


## 面试题:
  1). react/vue中的key的作用/内部原理
  2). 为什么列表的key尽量不要用index

1. 虚拟DOM的key的作用?
  1). 简单的说: key是虚拟DOM元素的固定标识, 在更新显示时key起着极其重要的作用
  2). 详细的说: 当列表数组中的数据发生变化生成新的虚拟DOM后, React进行新旧虚拟DOM的diff比较
      a. key没有变
          item数据没变, 直接使用原来的真实DOM
          item数据变了, 对原来的真实DOM进行数据更新
      b. key变了
          销毁原来的真实DOM, 根据item数据创建新的真实DOM显示(即使item数据没有变)
2. key为index的问题
  1). 添加/删除/排序 => 产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低
  2). 如果item界面还有输入框 => 产生错误的真实DOM更新 ==> 界面有问题
  注意: 如果不存在添加/删除/排序操作, 用index没有问题
3. 解决:
  使用item数据的标识数据作为key, 比如id属性值
4. 总结
如果往数组前面 添加/删除/排序 这时候用id做为key值，性能更好，也不会出问题
如果是往最后 添加/删除 这时候用啥都行
最好：有id就用id


# 什么是受控组件?
  * 收集表单数据的时候:不使用全局变量,使用state和onChange事件收集表单数据
