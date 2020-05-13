//类型约束
(
  function () {
    // 函数参数添加类型约束
    function greeter(person: string): string {
      return "hello" + person
    }
    let user = "Yee"
    // let user = [1,2,3,4];  会报错
    console.log(greeter(user));
  }
)();

//接口
(
  function () {
    interface Person {
      firstName: string
      lastName: string
    }

    function greeter(person: Person) {
      return 'Hello, ' + person.firstName + ' ' + person.lastName
    }

    let user = {
      firstName: 'Yee',
      lastName: 'Huang'
    }

    console.log(greeter(user))
  }
)();

//类
(
  function () {
    class User {
      fullName: string
      firstName: string
      lastName: string

      constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = firstName + " " + lastName
      }
    }

    interface Person {
      firstName: string
      lastName: string
    }
    function greeter(person: Person) {
      return "Hello" + person.firstName + " " + person.lastName
    }
    let user = new User("Zeng", "Cai")
  }
)()