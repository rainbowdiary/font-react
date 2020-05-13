"use strict";
//类型约束
(function () {
    // 函数参数添加类型约束
    function greeter(person) {
        return "hello" + person;
    }
    var user = "Yee";
    // let user = [1,2,3,4];  会报错
    console.log(greeter(user));
})();
//接口
(function () {
    function greeter(person) {
        return 'Hello, ' + person.firstName + ' ' + person.lastName;
    }
    var user = {
        firstName: 'Yee',
        lastName: 'Huang'
    };
    console.log(greeter(user));
})();
//类
(function () {
    var User = /** @class */ (function () {
        function User(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = firstName + " " + lastName;
        }
        return User;
    }());
    function greeter(person) {
        return "Hello" + person.firstName + " " + person.lastName;
    }
    var user = new User("Zeng", "Cai");
})();
