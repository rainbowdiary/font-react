/* 基本约束 */
(() => {
  function add(x: string, y: string): string {
    return x + y
  }

  let myAdd = function (x: string, y: string): string {
    return x + y
  }
})();

/* 书写完整类型 */
(() => {
  let myAdd: (x: string, y: string) => string = function (x: string, y: string): string {
    return x + y
  }
})();

/* 一般又类型断言所以无需写完整类型 */


/* 可选参数和默认参数 ,?为可选 */
(() => {
  function buildName(firstName: string = "A", lastName?: string): string {
    if (lastName) {
      return firstName + "-" + lastName
    } else {
      return firstName
    }
  }
  console.log(buildName("C", "D"));
  console.log(buildName("C"));
  console.log(buildName());
})();

/* 剩余参数 */
(() => {
  function info(x: string, ...args: string[]) {
    console.log(x, args);
  }
  info("abc", "a", "b", "c")  //abc (3) ["a", "b", "c"]
})()

/* 函数重载： 函数名相同，而形参不同的多个函数 */
// 重载函数声明
function add(x: string, y: string): string
function add(x: number, y: number): number

// 定义函数实现
function add(x: string | number, y: string | number): any {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 x + y
  if (typeof x === 'string' && typeof y === 'string') {
    return x + y
  } else if (typeof x === 'number' && typeof y === 'number') {
    return x + y
  }
}

console.log(add(1, 2))
console.log(add('a', 'b'))
// console.log(add(1, 'a')) // error