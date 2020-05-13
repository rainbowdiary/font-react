/*
访问修饰符: 用来描述类内部的属性/方法的可访问性
  public: 默认值, 公开的外部也可以访问
  private: 只能类内部可以访问
  protected: 类内部和子类可以访问
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
    // class Snake extends Animal, Test { // error 一个类只能有一个父类
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(name) {
            var _this = 
            // 调用父类型构造方法
            _super.call(this, name) || this;
            _this.age = 10;
            _this.sex = '雄性';
            return _this;
        }
        // 重写父类型的方法
        Snake.prototype.run = function (distance) {
            if (distance === void 0) { distance = 5; }
            console.log('sliding...', this.age, this.sex);
            _super.prototype.run.call(this, distance);
        };
        return Snake;
    }(Animal));
    var RedSnake = /** @class */ (function (_super) {
        __extends(RedSnake, _super);
        function RedSnake(name) {
            // 调用父类型构造方法
            return _super.call(this, name) || this;
        }
        // 重写父类型的方法
        RedSnake.prototype.run = function (distance) {
            if (distance === void 0) { distance = 10; }
            console.log('RedSnake sliding...');
            // console.log(this.age) // error age是private的
            console.log(this.sex); // 可以看到 sex是protected的
            _super.prototype.run.call(this, distance);
        };
        return RedSnake;
    }(Snake));
    new Animal('an').run(); // run是公开的, 所有可见
    // new Snake('sn').age // error age是private的
    // new Snake('sn').sex // error age是protected的
})();
