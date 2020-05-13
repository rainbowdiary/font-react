(() => {
  class Person {
    name1: string = "A"
    static name2: string = "B" ////静态属性只存在与类本身的属性，而不是实例对象上的
  }
  console.log(Person.name2);
  console.log(new Person().name1);
})()