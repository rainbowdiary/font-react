"use strict";
/* 1. 类的基本使用 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = /** @class */ (function () {
    // 构造方法
    function Greeter(message) {
        this.message = message;
    }
    // 普通方法
    Greeter.prototype.greet = function () {
        return "Hello " + this.message + "!";
    };
    return Greeter;
}());
console.log(new Greeter("TS").greet());
/* 2. 类的继承 */
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.run = function (distance) {
        console.log("Animal run " + distance + "m");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 重写: 重写父类的方法
    Dog.prototype.run = function (distance) {
        console.log("Dog run " + distance + "m");
        _super.prototype.run.call(this, 1000); // 调用父类的方法
    };
    return Dog;
}(Animal));
new Dog().run(100);
