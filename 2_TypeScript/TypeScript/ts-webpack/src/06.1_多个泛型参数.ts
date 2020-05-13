/* 给函数定义多个泛型参数 */

function swap<W, Y>(a: W, b: Y): [W, Y] {
  return [a, b]
}

const result = swap<string, number>("hello", 33.33)
console.log(result[0].split(""), result[1].toFixed(1));