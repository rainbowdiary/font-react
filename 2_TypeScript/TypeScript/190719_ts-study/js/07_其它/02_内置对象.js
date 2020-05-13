/*
内置对象
1. ECMAScript 的内置对象
    Boolean
    Number
    String
    Date
    RegExp
    Error
2. BOM 和 DOM 的内置对象
    Window
    Document
    HTMLElement
    DocumentFragment
    Event
    NodeList
*/
(function () {
    /*
    1. ECMAScript 的内置对象
      Boolean
      Number
      String
      Date
      RegExp
      Error
    */
    var b = new Boolean(true);
    b = false;
    var b2 = true;
    // b2 = new Boolean(false) // error
    var n = new Number(4);
    n = 4;
    var s = new String('abc');
    s = 'abc';
    var date = new Date();
    // date = Date.now() // error
    var reg = /^1\d10$/;
    // reg = '/^1\d10$/' // error
    var error = new Error('出错了');
    // error = {} // error
    /*
    2. BOM 和 DOM 的内置对象
      Window
      Document
      HTMLElement
      DocumentFragment
      Event
      NodeList
    */
    var div = document.getElementById('test');
    var divs = document.querySelectorAll('div');
    div.addEventListener('click', function (event) {
        console.log(event.target);
    });
    var fragment = document.createDocumentFragment();
})();
