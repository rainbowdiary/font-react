/*
类的基本定义与使用
*/
(function () {
    var Greeter = /** @class */ (function () {
        // 定义构造方法
        function Greeter(message) {
            this.message = message;
        }
        // 定义一般方法
        Greeter.prototype.greet = function () {
            return 'Hello ' + this.message;
        };
        return Greeter;
    }());
    var greeter = new Greeter('word');
    console.log(greeter.greet());
})();
