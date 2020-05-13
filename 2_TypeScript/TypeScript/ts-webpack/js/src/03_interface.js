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
    return source.indexOf(sub) !== -1 ? true : false;
};
console.log(mySearch("hello", "h"));
var Car1 = /** @class */ (function () {
    function Car1() {
    }
    Car1.prototype.alert = function () { console.log("Car1 Alarm alertFn"); };
    return Car1;
}());
new Car1().alert();
/* 3.1 一个类实现多个接口 */
var Car2 = /** @class */ (function () {
    function Car2() {
    }
    Car2.prototype.alert = function () { console.log("Car2 Alarm alertFn"); };
    Car2.prototype.lightOn = function () { console.log("Car2 Light LightOnFn"); };
    Car2.prototype.lightOff = function () { console.log("Car2 Light LightOffFn"); };
    return Car2;
}());
new Car2().alert();
new Car2().lightOn();
new Car2().lightOff();
/* 3.1 一个类实现多个接口 */
var Car3 = /** @class */ (function () {
    function Car3() {
    }
    Car3.prototype.alert = function () { console.log("Car3 Alarm alertFn"); };
    Car3.prototype.lightOn = function () { console.log("Car3 Light LightOnFn"); };
    Car3.prototype.lightOff = function () { console.log("Car3 Light LightOffFn"); };
    Car3.prototype.slice = function () { console.log("Car3 Light sliceFn"); };
    return Car3;
}());
new Car3().alert();
new Car3().lightOn();
new Car3().lightOff();
new Car3().slice();
