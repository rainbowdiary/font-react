(() => {
  function fn<T>(x: T): void {
    // console.log(x.length); Error 并不知道x有length属性
  }

  interface Lengthwise {
    length: number
  }

  function fn1<T extends Lengthwise>(x: T): void {
    console.log(x.length);  //并不知道x有length属性
  }

  fn1("abc")
  // fn1(123) Error number没有length属性
})()