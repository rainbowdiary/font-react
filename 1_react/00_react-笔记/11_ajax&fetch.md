## ajax请求

1. axios库
	1. 用法
		1. get请求
		  `axios.get('/user', {
		    params: {
		      ID: 12345
		    }
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  })
		  .finally(function () {
		    // always executed
		  });  `
		2. post请求
		  `axios.post('/user', {
		    firstName: 'Fred',
		    lastName: 'Flintstone'
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });`
2. fetch:
  + 原生
  + 没有跨域问题
  + 有兼容性问题:

### 案例axios-searchName

状态:searchName字符串
impt快捷键

写一部分测试一部分
   Search组件, state状态改变了
  点击按钮App得到searchName
什么时候发送axios
  旧生命周期:

    componentWillReceiveProps();只有它是父组件render后触发
    其他都要走两遍更新流程

   当前值通过参数传过来
List:
  关键代码:

    请求30条数据
    只要数组中对象的三条数据

优化:
  search没有更新也会被渲染

  1. 判断state状态

     shouldComponentUpdate()判断之前的值和最新的值是否一样
     如果状态有多个属性需要遍历;一般不使用for-in,使用Object.keys

  2. 兄弟组件使用订阅发布传递消息
