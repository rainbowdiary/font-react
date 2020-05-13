(() => {
  class Animal {
    name: string
    constructor(name: string) {
      this.name = name
    }
    run(distance: number = 0) {
      console.log(`${this.name} run ${distance}m`);
    }
  }

  class Snake extends Animal {
    constructor(name: string) {
      // 调用父类方法
      super(name)
    }
    // 重写父类方法
    run(distance: number = 5) {
      console.log("Snake sliding...");
      super.run(distance)
    }
  }

  class Horse extends Animal {
    constructor(name: string) {
      super(name)
    }
    // 重新父类方法
    run(distance: number = 50) {
      console.log("Horse dashing...");
      super.run(distance)
    }
    xxx() {
      console.log("xxx()");
    }
  }

  const snake = new Snake("sn")
  snake.run()

  const horse = new Horse("ho")
  horse.run()

  /* 父类型引用指向子类型的实例 ===> 多态 */
  const tom: Animal = new Horse("ho2")
  tom.run()  //使用子类的方法

  /* 子类型引用指向父类型实例 */
  const tom3: Snake = new Animal("tom3")
  tom3.run() //父类的方法

  /*   const jack: Horse = new Animal("jack")
       jack.run();    Error*/
})()