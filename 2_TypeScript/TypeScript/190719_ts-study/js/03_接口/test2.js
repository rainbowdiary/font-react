/*
接口可以描述函数类型
*/
(function () {
    var search = function (sourceS, s) {
        return sourceS.indexOf(s) !== -1;
    };
    console.log(search('abcd', 'bc'), search('abcd', 'cb'));
})();
