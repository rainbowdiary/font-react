"use strict";
/* 接口: 约束对象的类型，接口是对象属性和方法的描述 */
var person1 = {
    id: 1,
    name: "zhangsan",
    age: 21,
};
// person1.id = 12 Error readonly
person1.name = "lisi";
var mySearch = function (source, sub) {
    return true;
};
console.log(mySearch("hello", "h"));
