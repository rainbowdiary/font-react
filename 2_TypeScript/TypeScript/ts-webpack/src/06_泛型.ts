/* 泛型： 只在定义函数，接口，类的时候，不预先指定具体的类型，
         而在使用的时候再指定具体类型的一种特性
  作用：为了让定义更加简单，1. 有语法提示 2. 会报错
  怎么做：定义的时候指定不确定类型，用的时候指定确定类型来替代
  */

  
// 需求： 创建一个函数, 实现功能: 根据指定的数量 count 和数据 value , 创建一个包含 count 个 value 的数组
/* 不用泛型 (T代表不确定类型)*/
; (() => {

  function getArr(count: number, value: any): any[] {
    let arr: any[] = [];
    for (let index = 0; index < count; index++) {
      arr.push(value)
    }
    return arr
  }

  const arr1 = getArr(2, 88.88)
  const arr2 = getArr(2, "t-s")
  console.log(arr1[0].toFixed(1), arr2[1].split("")); //没有语法提示
  // console.log(arr2.splice(0, 1), arr1[1].split("-")); //不会报错，但是运行后会报错

})()



  /* 使用泛型 */
  ; (() => {
    function getArr<T>(count: number, value: T): T[] {
      let arr: Array<T> = [];
      for (let index = 0; index < count; index++) {
        arr.push(value)
      }
      return arr
    }

    const arr1 = getArr<number>(2, 88.8)
    const arr2 = getArr<string>(2, "t-s")
    console.log(arr1[0].toFixed(1), arr2[1].split("")); //有语法提示
    // console.log(arr2.splice(0, 1), arr1[1].split("-")); //会报错，但是运行后会报错
  })()