/* public private protected readonly 函数参数属性*/
(() => {
  class Animal {
    // public name: string = "lisa"
    private age: number = 10
    protected sex: string = "famale"
    readonly friends: number = 12
    public constructor(readonly name: string) {
      // this.name = name
    }
    public run(distance: number = 0) {
      console.log(`${this.name} run ${distance}m`, this.age);
    }
  }

  class RedSnake extends Animal {
    constructor(name: string) {
      // 调用父类方法
      super(name)
    }
    // 重写父类方法
    run(distance: number = 5) {
      console.log("Snake sliding...");
      super.run(distance)
      console.log(this.name); //public类型，可见
      // console.log(this.age); //private类型，不可见
      console.log(this.sex);  //protected类型，子类可见
      // this.friends=13 readonly类型
      console.log(this.friends);  //protected类型，子类可见
    }
  }

  const redS: Animal = new RedSnake("redS");
  // console.log(redS.sex);   //Error  protected类型，子类以外不可见
  redS.run()
  console.log(redS.name); //函数参数属性，name 的值赋给 this.name成为了属性

})()