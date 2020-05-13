/*
定义函数
*/
(function () {
    // 命名函数
    function add(x, y) {
        return x + y;
    }
    // 匿名函数
    var myAdd = function (x, y) {
        return x + y;
    };
})();
(function () {
    // 命名函数
    function add(x, y) {
        return x + y;
    }
    // 匿名函数 (存在类型推断)
    var myAdd = function (x, y) {
        return x + y;
    };
    // myAdd = 123 // error
    // 完整写法
    var myAdd2 = function (x, y) {
        return x + y;
    };
    console.log(add(1, 2), myAdd(2, 3));
})();
