(function () {
  //ts数据类型

  //1. 字符串
  let name: string = "raibow"
  name = "rainbow1"
  console.log(name);

  //2. 数字
  let n: number = 1
  console.log(n);

  // 3. 布尔
  let isDone: boolean = true;
  isDone = false
  console.log(isDone);

  // 4/5. null undefined
  let nu: null = null
  // nu="hello"   //error 不能将类型“"hello"”分配给类型“null”。
  console.log(nu);

  let un: undefined = undefined
  // let un = 11 error
  console.log(un);

  //6.数组  两种方式定义
  let arr1: number[] = [1, 3, 4, 5];
  let arr2: Array<string> = ["react", "vue"]
  console.log(arr1, arr2);

  //7.元祖Tuple （已知元素数量和类型的数组）
  let t1: [string, number]
  t1 = ["hello", 3]
  // t1 = [6, "react"] Error
  console.log(t1[0].substring(0, 1));
  // console.log(t1[1].substring(0, 1)); error,number类型没有substring方法

  //8. 枚举 enum （为一组数值赋予友好的名字）
  enum Color {
    Red,
    Green = 3,
    Blue
  }
  let myColor: Color = Color.Blue  //枚举默认值从0 开始递增
  console.log(myColor, Color.Red);  //2 
  // 得到映射的名字
  enum Color2 { Red = 1, Green, Blue }
  let colorName: string = Color2[2]  //Green
  console.log(colorName);

  //9. any （不清楚数据类型，表示任何类型可以任意赋值）
  let notSure: any = 4;
  notSure = "hello ts";
  notSure = false;
  console.log(notSure);

  let list: any[] = [1, "abc", true]  //数组 list: number[]
  list[1] = 100
  console.log(list);

  //10. void （表示没有任何类型）  只能是undefined
  function fn(): void {
    console.log("hellots");
    // return  undefined
    // return null
    // return 123 Error
  }
  console.log(fn()); //undefined

  //11. object
  function name1(obj: object): object {
    console.log("name1", obj);
    return { a: "a" }
  }

  console.log(name1({ b: "b" }));
  console.log(name1(new String("abc")));
  console.log(name1(String));

  //12. 联合类型 Union Types （取值为多种类型中的一种）
  //需求1: 定义一个函数得到一个数字或者字符串值的字符串形式值
  function getString(x: string | number) {
    return x.toString()
  }
  console.log(getString("hello"));

  //类型断言1:
  //需求2： 定义一个函数得到一个数字或字符串的长度
  function getLength(x: number | string) {
    // return x.length  Error
    if ((<string>x).length) {
      return (x as string).length
    } else {
      return x.toString().length
    }
  }
  console.log(getLength("rainbow"));

  //类型断言2：
  // 1. 变量赋值，已经推荐了数据类型
  let c = 123;
  // c = "rainbow" Error 此时c:number

  // 2. 未赋值 断言为any
  let d;
  d = 123;
  d = "hello"
})()