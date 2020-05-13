/* 1. 类的基本使用 */

class Greeter {
  // 属性
  message: string
  // 构造方法
  constructor(message: string) {
    this.message = message
  }
  // 普通方法
  greet(): string {
    return `Hello ${this.message}!`
  }
}
console.log(new Greeter("TS").greet());

/* 2. 类的继承 */
class Animal {
  run(distance: number) {
    console.log(`Animal run ${distance}m`);
  }
}
class Dog extends Animal {
  // 重写: 重写父类的方法
  run(distance: number) {
    console.log(`Dog run ${distance}m`);
    super.run(1000) // 调用父类的方法
  }
}
new Dog().run(100)