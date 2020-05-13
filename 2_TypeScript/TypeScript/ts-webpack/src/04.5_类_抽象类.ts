/* 抽象类： 
abstract关键字
1. 不能被实例化 
2. 抽象类必须包含抽象方法，
3. 只能子类继承并实现该抽象方法
*/
(() => {
  abstract class Animal {

    abstract cry(): any  //抽象方法: 还没有实现的方法

    run() {
      console.log("run");
    }
  }

  class Dog extends Animal {
    cry() {
      console.log("Dog cry()");
    }
  }

  // new Animal()  抽象类不能创建实例，只能继承，并子类实现该方法
  const dog = new Dog()
  dog.cry()
  dog.run()
})()