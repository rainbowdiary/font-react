/* (() => {
  class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T 
  }

  let myGenericNumber = new GenericNumber<number>()
  myGenericNumber.zeroValue = 0
  myGenericNumber.add = function (x: number, y: number) {
    return x + y
  }

  let stringNumeric = new GenericNumber<string>()
  stringNumeric.zeroValue = 'abc'
  stringNumeric.add = function (x: string, y: string) {
    return x + y
  }

  console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
})() */