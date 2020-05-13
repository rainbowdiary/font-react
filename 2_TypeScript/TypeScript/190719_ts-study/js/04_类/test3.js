/*
多态: 父类型引用指向子类型对象
*/
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
(function () {
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.run = function (distance) {
            if (distance === void 0) { distance = 0; }
            console.log(this.name + " run " + distance + "m");
        };
        return Animal;
    }());
    var Test = /** @class */ (function () {
        function Test() {
        }
        return Test;
    }());
    // class Snake extends Animal, Test { // error 一个类只能有一个父类
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(name) {
            // 调用父类型构造方法
            return _super.call(this, name) || this;
        }
        // 重写父类型的方法
        Snake.prototype.run = function (distance) {
            if (distance === void 0) { distance = 5; }
            console.log('sliding...');
            _super.prototype.run.call(this, distance);
        };
        return Snake;
    }(Animal));
    var Horse = /** @class */ (function (_super) {
        __extends(Horse, _super);
        function Horse(name) {
            // 调用父类型构造方法
            return _super.call(this, name) || this;
        }
        // 重写父类型的方法
        Horse.prototype.run = function (distance) {
            if (distance === void 0) { distance = 50; }
            console.log('dashing...');
            // 调用父类型的一般方法
            _super.prototype.run.call(this, distance);
        };
        // 扩展一个新方法
        Horse.prototype.xxx = function () {
            console.log('xxx()');
        };
        return Horse;
    }(Animal));
    var sn = new Snake('sn');
    var ho = new Horse('ho');
    // 多态: 父类型的引用指向子类型的实例(对象)
    var animal = new Snake('tom');
    animal.run(); // 调用的是子类型对象的方法
    animal = new Horse('Jack');
    animal.run(); // 调用的是子类型对象的方法
    /*
    能不能让一个子类型的引用指向父类型实例?  Java中都不允许
    1. 如果子类型扩展了新的方法, 不可以
    2. 如果子类型没有扩展新的方法, 可以
    */
    var sn2 = new Animal('sn2');
    sn2.run();
    // const ho2: Horse = new Animal('ho2') // error 
})();
