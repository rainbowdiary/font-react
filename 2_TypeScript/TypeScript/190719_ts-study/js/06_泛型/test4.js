/*
泛型约束
*/
(function () {
    function fn(t) {
        // console.log(t.length) // error 不确定t有length属性
    }
    function fn2(t) {
        console.log(t.length);
    }
    console.log(fn2('abc')); // string有length属性
    // console.log(fn2(123))  // error number没有length属性
})();
