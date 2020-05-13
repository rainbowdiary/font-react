# 技术点:

## 数组
some 返回值true 只要有一个命中

## 不会改变原数组的方法

1. map  数组的元素变, 数组长度不变
2. filter 数组的长度变, 值不变
3. reduce 数组元素和值都变 ; 数组变对象       

要改什么

## 给对象添加属性,属性为变量

  let key = "name"
  const obj = {[key]: "zhangsan"}
  //输出{name: "zhangsan"} 

2.class类继承的时候为什么要调用super(); 
 super代表父类的构造函数, 
  不调用子类只有自己的构造函数, 
  调用才能拿到父类的构造函数

  这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

3. 给对象结构后可以添加属性和值

    ` this.setState({
	  comments: [{ ...comment, id: this.id++ }, ...this.state.comments]
	});`
	

4. const let 如何使用:

  一般使用const, 如果设计的时候定义为let, 
  之后变量又没有变化, 设计就有问题

5. 遍历对比属性值
   const keys = Object.keys(this.state); 

String 转 Number +
