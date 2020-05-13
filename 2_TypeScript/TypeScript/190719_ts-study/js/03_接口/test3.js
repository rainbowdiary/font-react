/*
类类型: 实现接口
1. 一个类可以实现多个接口
2. 一个接口可以继承多个接口

*/
(function () {
    /* 定义一个类, 实现一个接口 */
    var Car = /** @class */ (function () {
        function Car() {
        }
        Car.prototype.alert = function () {
            console.log('Car alert()');
        };
        return Car;
    }());
    /* 定义一个类, 实现多个接口 */
    var Car2 = /** @class */ (function () {
        function Car2() {
        }
        Car2.prototype.alert = function () {
            console.log('Car2 alert()');
        };
        Car2.prototype.lightOn = function () {
            console.log('Car2 lightOn()');
        };
        Car2.prototype.lightOff = function () {
            console.log('Car2 lightOff()');
        };
        return Car2;
    }());
    new Car().alert();
    var car2 = new Car2();
    car2.alert();
    car2.lightOn();
    car2.lightOff();
    var Car3 = /** @class */ (function () {
        function Car3() {
        }
        Car3.prototype.alert = function () {
            console.log('Car3 alert()');
        };
        Car3.prototype.lightOn = function () {
            console.log('Car3 lightOn()');
        };
        Car3.prototype.lightOff = function () {
            console.log('Car3 lightOff()');
        };
        return Car3;
    }());
    var car3 = new Car3();
    car3.alert();
    car3.lightOn();
    car3.lightOff();
})();
