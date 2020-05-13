(() => {
  /* 接口: 约束对象的类型，接口是对象属性和方法的描述 */

  /* 1. 接口描述对象类型 */
  interface IPerson {
    readonly id: number
    name: string
    age: number
    sex?: string   //?表示可选
  }

  const person1: IPerson = {
    id: 1,
    name: "zhangsan",
    age: 21,
    // sex: "女"  不会报错
  }

  // person1.id = 12 Error readonly
  person1.name = "lisi"

  /* 2. 接口描述函数类型 */
  interface ISearchFn {
    (source: string, subscribe: string): boolean
  }

  const mySearch: ISearchFn = function (source, sub) {  //定义接口，函数必须满足，参数和返回值的约束
    return source.indexOf(sub) !== -1 ? true : false
  }
  console.log(mySearch("hello", "h"));

  /* 3. 接口实现类类型 */
  interface Alarm {
    alert(): any
  }
  interface Light {
    lightOn(): void
    lightOff(): void
  }
  class Car1 implements Alarm {
    alert() { console.log("Car1 Alarm alertFn"); }
  }
  new Car1().alert()

  /* 3.1 一个类实现多个接口 */
  class Car2 implements Alarm, Light {
    alert() { console.log("Car2 Alarm alertFn"); }
    lightOn() { console.log("Car2 Light LightOnFn"); }
    lightOff() { console.log("Car2 Light LightOffFn"); }
  }
  new Car2().alert()
  new Car2().lightOn()
  new Car2().lightOff()

  /* 4. 接口继承 */
  interface LightableAlarm extends Alarm, Light {
    slice(): any
  }

  /* 3.1 一个类实现多个接口 */
  class Car3 implements LightableAlarm {
    alert() { console.log("Car3 Alarm alertFn"); }
    lightOn() { console.log("Car3 Light LightOnFn"); }
    lightOff() { console.log("Car3 Light LightOffFn"); }
    slice() { console.log("Car3 Light sliceFn"); }
  }
  new Car3().alert()
  new Car3().lightOn()
  new Car3().lightOff()
  new Car3().slice()
})()