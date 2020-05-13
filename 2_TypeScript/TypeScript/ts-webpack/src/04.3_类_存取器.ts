(() => {
  class Person {
    firstName: string = "A"
    lastName: string = "B"
    get fullName() {
      return this.firstName + "-" + this.lastName
    }
    set fullName(value) {
      const names = value.split("-");
      this.firstName = names[0]
      this.lastName = names[1]
    }
  }

  /* 读取 */
  const p = new Person()
  console.log(p.fullName);
  /* 修改 */
  p.firstName = "C"
  p.lastName = "D"
  console.log(p.fullName);

  p.fullName = "E-F"
  console.log(p.firstName, p.lastName);
})()