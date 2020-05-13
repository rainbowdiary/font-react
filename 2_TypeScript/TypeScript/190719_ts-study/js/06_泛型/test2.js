/*
泛型接口
*/
(function () {
    /* 定义一个数据类型 */
    var User = /** @class */ (function () {
        function User(name, age) {
            this.name = name;
            this.age = age;
        }
        return User;
    }());
    // 定义操作User数据的实现类
    var UserCRUD = /** @class */ (function () {
        function UserCRUD() {
            this.data = [];
        }
        /*
        添加一个新的数据对象 返回数据对象的id
        */
        UserCRUD.prototype.add = function (user) {
            var id = Date.now();
            user.id = id;
            this.data.push(user);
            return id;
        };
        /*
        根据id查询对应的数据对象
        */
        UserCRUD.prototype.getById = function (id) {
            return this.data.find(function (user) { return user.id === id; });
        };
        return UserCRUD;
    }());
    // 测试
    var userCRUD = new UserCRUD();
    var id1 = userCRUD.add(new User('tom', 12));
    var id2 = userCRUD.add(new User('tom2', 13));
    console.log(userCRUD.data, userCRUD.getById(id1), userCRUD.getById(1));
})();
