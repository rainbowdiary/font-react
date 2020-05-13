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
/*
类的继承
*/
(function () {
    // 父类
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.run = function (distance) {
            console.log("Animal run " + distance + "m");
        };
        return Animal;
    }());
    // 子类
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // 重写: 重新实现从父类继承的方法
        Dog.prototype.run = function (distance) {
            console.log("dog run " + distance + "m");
            // 调用父类型的方法
            _super.prototype.run.call(this, distance);
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    dog.run(10);
})();
