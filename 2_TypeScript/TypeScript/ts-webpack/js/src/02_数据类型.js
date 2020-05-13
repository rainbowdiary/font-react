"use strict";
(function () {
    //ts数据类型
    //1. 字符串
    var name = "raibow";
    name = "rainbow1";
    console.log(name);
    //2. 数字
    var n = 1;
    console.log(n);
    // 3. 布尔
    var isDone = true;
    isDone = false;
    console.log(isDone);
    // 4/5. null undefined
    var nu = null;
    // nu="hello"   //error 不能将类型“"hello"”分配给类型“null”。
    console.log(nu);
    var un = undefined;
    // let un = 11 error
    console.log(un);
    //6.数组  两种方式定义
    var arr1 = [1, 3, 4, 5];
    var arr2 = ["react", "vue"];
    console.log(arr1, arr2);
    //7.元祖Tuple （已知元素数量和类型的数组）
    var t1;
    t1 = ["hello", 3];
    // t1 = [6, "react"] Error
    console.log(t1[0].substring(0, 1));
    // console.log(t1[1].substring(0, 1)); error,number类型没有substring方法
    //8. 枚举 enum （为一组数值赋予友好的名字）
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 3] = "Green";
        Color[Color["Blue"] = 4] = "Blue";
    })(Color || (Color = {}));
    var myColor = Color.Blue; //枚举默认值从0 开始递增
    console.log(myColor, Color.Red); //2 
    // 得到映射的名字
    var Color2;
    (function (Color2) {
        Color2[Color2["Red"] = 1] = "Red";
        Color2[Color2["Green"] = 2] = "Green";
        Color2[Color2["Blue"] = 3] = "Blue";
    })(Color2 || (Color2 = {}));
    var colorName = Color2[2]; //Green
    console.log(colorName);
    //9. any （不清楚数据类型，表示任何类型可以任意赋值）
    var notSure = 4;
    notSure = "hello ts";
    notSure = false;
    console.log(notSure);
    var list = [1, "abc", true]; //数组 list: number[]
    list[1] = 100;
    console.log(list);
    //10. void （表示没有任何类型）  只能是undefined
    function fn() {
        console.log("hellots");
        // return  undefined
        // return null
        // return 123 Error
    }
    console.log(fn()); //undefined
    //11. object
    function name1(obj) {
        console.log("name1", obj);
        return { a: "a" };
    }
    console.log(name1({ b: "b" }));
    console.log(name1(new String("abc")));
    console.log(name1(String));
    //12. 联合类型 Union Types （取值为多种类型中的一种）
    //需求1: 定义一个函数得到一个数字或者字符串值的字符串形式值
    function getString(x) {
        return x.toString();
    }
    console.log(getString("hello"));
    //类型断言1:
    //需求2： 定义一个函数得到一个数字或字符串的长度
    function getLength(x) {
        // return x.length  Error
        if (x.length) {
            return x.length;
        }
        else {
            return x.toString().length;
        }
    }
    console.log(getLength("rainbow"));
    //类型断言2：
    // 1. 变量赋值，已经推荐了数据类型
    var c = 123;
    // c = "rainbow" Error 此时c:number
    // 2. 未赋值 断言为any
    var d;
    d = 123;
    d = "hello";
})();
