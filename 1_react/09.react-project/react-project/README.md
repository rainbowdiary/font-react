React相关代码已经上传 class0722 / class0722-react-admin仓库
其中 class0722 更新了React扩展和Hooks相关基本代码
class0722-react-admin 更新了一个新分支 hook，其中user模块采用hook编写。 
React能力强的可以多看看

## 项目准备
## 服务端和客户端源码
- 启动服务端
  - yarn add 下依赖
  - yarn start 调用nodemon 启动
- 启动客户端项目源码
  - 下依赖
  - yarn start
## git 操作
上传分支
git pull origin damu
拉取远程分支(达姆,到本地分支 dev)
git fetch origin damu:damu (只能使用一次)
git pull origin damu

## 项目准备

1. git 仓库(master/dev)
2. 提前配置
   antd 按需加载
   redux
   不能引入全局样式
   antd 配置使用结构赋值的方式引入
3. redux(模块化)
   1. 协同开发,避免冲突,因为其他人也需要使用 redux
   2. 定义成目录,每次模块化的引入
   3. 库 redux-thunk 使用异步
   4. redux-devtools-extension
4. react-rotuer-dom 写成可以扩展的,写成配置文件
   1. react-router-dom
      404 页:
      不写:匹配所有
      但是根路径会被匹配: 加上 Switch
5. 写 login 静态组件
   antd 的 form 组件
   写样式

## 登陆功能
- 添加表单校验

  1. antd
  2. 高阶组件用法,Form.create,传入 this.props.form
      高阶组件使用装饰器语法 addDecoratorsLegacy
  3. validator() 使用 if-else 只提示一种错误;方法可以复用

- 收集数据
   1. 先进行表单校验
      1. validateFields 校验表单并获取表单项的值
      2. 只有设置 htmlType="submit:设置原生的 type 类型才能发生点击成功
   2. 通过了,发送 axios 请求
   3. 请求成功:判断是否登陆成功
    成功：
      - 跳转/
      - LocalStorage持久化存储用户
    错误： 
      - 重置密码表单
      
存储用户数据
	LocalStorage
	redux
## 发送 axios 请求数据:(查看 API 文档)

本地测试:
OPTIONS 预检请求:查看是否可以跨域

1. 请求头设置:
   "context-type": "application/x-www-form-urlencoded"
   data: "key:value&key1&value1"
   "context-type": "application/json"
   data:{key:value,key1:value}
2. axios.create({公共配置})
3. 拦截器(代码复用)：
   请求拦截器
   响应拦截器
   错误精准提示
   技术点:统一提示错误使用 Promise.reject(errorMessage)
4. 封装 axios 请求 api 的方法

### 封装 axios 到项目:

src/api/request.js
封装 axios 请求设置
antd 提示错误
抽取错误代号
src/config/code-message.js
响应拦截器中的 data 抽取出来
token 暂未解决
api/index.js
封装登陆请求
修改之前的登陆请求的代码


## redux 开发流程

1. 定义 action
   - 定义是同步还是异步的:是否需要发送 axios 请求
   - getUserAsync() - dispatch
2. 定义 action-type
   1. GET_USERS_MESSAGE
3. reducer 1.
4. 定义 login 模块为 containers
   1. 容器组件
      1. Provider 传递 store
      2. connect 高阶组件

不写.catch 异步 action 返回 promise,如果不去掉,返回不是 promise

\*\* 4.axios 封装函数 promise .then 方法的数据传递流程

## redux 是内存管理(持久化存储用户数据)

1. 用户刷新 redux 数据被清空
2. 存储在 LocalStorage 中(存的是键值对)
3. 封装函数保存
   1. utils/storage.js
   2. 设置/获取/删除用户数据
      1. window.LocalStorage.getItem
      1. 解析成 json,存一个 json 数据,
      1. 判断传入的数据类型
         try-finally:不管成功失败都触发
         try-catch:失败触发
      1. 考虑设置过期时间,判断过期时间
      1. 返回值不应该包含过期时间
4. 登陆成功后持久化存储用户数据
5. 但是 redux 中刷新还是没有数据
   1. 初始化读取本地 storage 的数据

## 思考

本地没有用户数据,当前应该不能访问,重定向到登陆页
如果发现登陆页有用户数据,跳转到 home 页面
其他组件也需要验证

## 登陆检查高阶组件@withCheckout

判断如果本地有 localstorage 的 token,即使不在登陆页也可以访问

1. 因为每个功能都需要使用,使用高阶函数:

- container/with-check-login
  定义高阶组件都需要把接收到的 props 往下传
  路由组件的属性
  逻辑: \* 如果用户在/login
  用户登录过 去 /
  用户没有登陆过 不动

      	* 用户在非/login
      	用户登录过 不动
      	用户没有登陆过 去/login
      	* 使用路由组件的属性location.pathname,有这个属性说明是路由组件

  问题: 高阶组件中使用 connect 获取 redux 中数据失败,显示 undefined?

  解决: 1.查看 redux 中数据为字符串
  2.redux 数据从 Localstorage 中获取,修改 getItem 函数中数据类型,返回的 json 字符串转换为{}

- 清空 redux 中的数据

2. 使用高阶组件的组件:判断是否登陆并跳转
   login
   home
   notfind
   装饰器只能修饰类;少调用一次
   最外面一层是使用 Route 包裹的,但是里面自己定义 Login 组件没有路由三大属性
   解决:接收多少属性都会把属性往下传

react特性
  对父组件进行登陆检查，子组件自然有了登陆检查；
  将@withCheckout给BasicLayout
  原因： 先渲染父组件
## 验证 token

1. 需求：用户可能在本地 localStorage 中伪造 token
2. 解决：不用刻意向服务器发送请求验证 token，只需要正常发送请求，一旦在 home 组件发送请求都要 token。一旦 token 出错服务器会返回一个 401 的错误状态码
3. 思路：

- 统一在响应拦截器中错误回调函数判断状态码是否是 401
  - 如果是，就要 1.清空本地数据（localStorage、redux）2.跳转登陆页
    - redux 数据因为不是组件不能使用 connect 方法，只能通过 store.dispatch 更新
  - 最后跳转到 /login 重新登录
    - 因为不是组件获取不到路由组件的三大属性，从而不能 history.push。此时需要修改路由的配置
    - 通过对 react-router-dom 中 BrowserRouter 的源代码查看，BrowserRouter 就是由 react-router 中 Router + 传入 history 属性组成的
    - 所以需要将 react-router-dom 中 BrowserRouter 改成 react-router 中 Router + 传入 history 属性，此时就能得到 history 属性
    - 将 history 定义成模块去复用，从而拦截器函数中可以使用了

#　开发功能 home 页面
优先级高的先开发

1. 实现静态左侧菜单栏 LeftNav 组件,
   菜单栏显示数据从后台生成,前端遍历生成
   定义 config/menus.js 存放菜单栏数据
   icon/path/title
   定义数据类型:[{icon:'',path:'',children:[]}]
   遍历展示菜单,数据存放在状态数据 state 中
   实现点击跳转内容:使用 react-router-dom 的 Link
2. 需求: 点击菜单跳转,只修改 Layout 中 content 的内容,而不是跳转 404
   方法:

   1. 变化的内容:成为 BasicLayout 的子组件
   2. 修改 App.jsx 让 App 的 Route 组件成为 BasicLayout 的子组件,让 Route 组件在 BasicLayout 中指定位置显示
      问题: 内容无法加载,无法将里面子组件的内容显示在 BasicLayout 的变化位置
      解决: 使用 this.props.children 属性: 显示标签的内容
      用法:

      - this.props.children 的用法:
      - A 组件显示 App 组件中的内容
      - Home 组件:
      - 1. 引入 A 组件
      - 2. 让 A 组件成为子组件
      - 3. 包裹需要显示的 App 组件的内容
      - A 组件的 this.props.children 属性中将会得到 App 组件的内容
        需求: BasicLayout 组件的 content 位置展示路由组件的内容

      出现问题: 删除 token,发现 login 页面也在 Layout 中显示
      因为所有的路由都包在 Layout 中了

      解决:让 Login 组件在 Layout 组件外面
      路由组件中区分是否需要验证的路由
      /config/route.js
      {authRoutes,
      noAuthRoutes}

- bug: 二级地址,删掉 token 还是可以访问,没有跳转登陆页

4. 需求：菜单栏默认选中，选中样式和路径需要与当前用户点击一致

- 方法：

  - 通过antd <Menu defaultSelectedKeys={[“key”]}>组件控制
  - 让所有组件menu菜单的key值为当前路径
  - 获取当前路径;
    - 因为不是路由组件，所以无法拿到pathname
    - 使用“react-router-dom”的@withRouter高阶组件得到路由组件的三大属性
  - 指定defaultSelectedKeys属性为当前路径，即用户当前点击的菜单

5. 点击子菜单其对应的父菜单默认展开
- 方法：
 - 1.通过antd <Menu defaultOpenKeys={[“key”]}>组件控制
  - defaultOpenKeys： 初始展开的 SubMenu 菜单项 key 数组
 - 2.定义获取当前子菜单的父菜单的key方法 getOpenKeys
  - 遍历所有的菜单项目，使用数组find方法查找找到当前子菜单并返回父级菜单的key

6. 点击展开菜单栏的时候：标题文字的显示与隐藏
- 复用Layout组件中控制点击收缩菜单栏的状态（antd）给LeftNav使用，展开为false
- 样式微调：
  logo样式：
    去掉
    - margin-right: 10px;  //收起菜单栏时水平垂直居中
  标题：
    - margin-left: 10px; //间隔加载标题上
    - margin-bottom: 0;  
    - white-space: nowrap 菜单栏展开的文字不换行：

## HeaderMain组件
1. 封装头部组件
2. 实现HeaderMain的静态页面
### 全屏：
- 库：screenfull
    `fullScreen = () => {
      screenfull.toggle();
    }`

- 1.screenfull.toggle() : 点击按钮切换全屏 
  - 图标切换，但是esc时图标未切换
- 2.定义state isFullScreen切换全屏图标
  - screenfull.on(“change”) :
    - 全屏变化时触发，用来修改图标状态
    - 只触发一次定义在componentDidMount中
    - 监控点击和esc事件
  - screenfull.off(“change”)
    - 解绑事件 
    - componentWillUnmount中定义
    - 需要事件名称和事件回调函数都一样

### 国际化功能
- I18N
- 库： react-i18next
- 仓库地址：github/example/react实际的例子
- 配置
  - 定义配置文件
    - i18n.js
  - 定义语言包
    - public/locales/en/translation.json
    - public/locales/zh/translation.json
    - public/locales/zh-CN/translation.json
- App.js
  - 入口文件引入配置文件
-使用：
  react-i18next的三种方法：
  - 1.userTranslation react hook
  - 2. Trans
  - 3.withTranslation 高阶组件（给组件传递t，i18n，通过this.props）
      `render(){
        const { t, i18n } = this.props;
        return <h2>{t('title')}</h2>;
      }`
    - 1.懒加载: 需要要的组件都必须包裹<Suspense fallback={<Loader />}></Suspense>
      - Suspense用于懒加载：等待内部元素加载完才显示，没加载完就显示fallback的值
      - 加载loading图
    - 2.LeftNav需要做国际化，哪里做国际化哪里使用i18n的高阶组件
    - 3.t 用来切换显示 （根据当前语言环境，选择使用哪个语言包加载）
        t("找translation.json对应key值"):
          - 用来切换语言显示（根据当前语言环境，选择使用哪个语言包加载）
          - 菜单根据config/menu.js显示，将menu的title写成-->"translation.json对应key值"
    - 4.i18n上的方法
      - changeLang（）事件: 切换语言
      - language: 用来获取当前语言
      - 定义isEnglish进行中英文切换
- 问题：
 - 1.菜单切换不生效？
  - 需要重复创建菜单; LeftNav是在DidMount中调用createMenus，，只会被渲染一次
  而切换语言是要反复重新渲染，导致菜单切换不生效。
- 2.暂时性死去？
  - 命名重复会导致暂时性死去
### 显示指定的用户名
  从redux中获取用户名
### 退出登陆
antd modal对话框组件
退出登陆：
  清空LocalStorage、redux数据
  同之前清空数据一样处理

问题：
  1. 登出时，如果确认登陆，清楚用户数据后应该不需要跳转页面到登陆页面了吧？
  之前已经做过逻辑：登陆检测：withCheckLogin
  2. 退出按钮的样式未完成
this指向问题：普通函数this是undefined

### HeaderMain中title标题计算和变化
需求： 
  -不想this.setState更新title，只想location.pathname变化才更新title，性能好一些
    - HeaderMain因为时间实时展示功能会每隔一秒重新渲染一次，如果在render中实现功能，会导致每隔一秒渲染一次
    
    不同组件联动，更新的方式
    - 一个组件通过state修改另一个组件
    - 父组件更新导致子组件更新(功能在)
      - 解决：定义在getDerivedStateFromProps（prevState，nextProps）{return{新状态}}
        - 判断路径是否一样
          - 一样
            返回原来的值
          -不一样
            - 定义循环遍历menu：找到title
            - 返回{pathname，title：“拼串国际化”}
        - t方法转换国际化

### 时间计算
方法1：
  - 自己封装时间格式化函数
    - 定义转换时间格式函数formatDate；
    - 初始化放在state状态中
    - 定义在一次性生命周期函数DIdMount的定时器中
  
方法2：
  - 使用时间格式库：
    - momentjs：功能多，臃肿
    - dayjs：轻量级
每隔一秒HeaderMain都会渲染一次

## 商品/分类管理表格功能
前台分页： 
  将后台数据全部请求回来，再展示
后台分页
  按需加载后台数据
## 分类管理
1. 定义Category组件
2. 实现静态页面
  antd的<Card><Table></Table pagination={}></Card>
3. 实现动态展示
 商品数据存放在redux中
  - 获取分类列表的api请求函数
  - 定义获取分类列表的异步action
    - action-type
  - reducer
  - connect注入获取请求数据

bug： 一点显示无效的token，但是redux中还是有token，LocalStorage中没有

### 添加分类

提取From表单组件
  进行表单校验
ok点击添加商品
  父组件拿到子组件的校验数据（From组件的this.props.form.validateFields）
  方法1： 通过ref
  方法2： antd校验其他组件 <EnhancedForm wrappedComponentRef={(form) => this.form = form} />

  拿到校验后的数据
    发送添加商品请求
    更新redux数据
      添加到之前的数据
    添加成功之后
      对话框消失
      清空表单数据
      隐藏完再清空
        隐藏对话框的动画效果结束后再清空
### 修改分类
需求： 点击修改分类，表单显示商品名称
  categoryId通过定义在columns中渲染传递的参数调用函数this.showUpdate（category）拿到当前点击的是哪一个
  `
    render: (category) => {
      console.log(category); //打印当前显示的数据
      return <div>
        <Button type="link" onClick={this.showUpdateCategory（category）}>修改分类</Button>
        <Button type="link">删除分类</Button>
      </div>
    },
    showUpdateCategory（category）闭包得到当前点击的列表项   //有点没懂
    存入state中
  `
  将选中的列表名称通过属性传给From表单；
  表单拿到categortName，进行展示：使用antd的属性
    getFieldDecorator{initialValue: categoryName} //表单初始值与rules同级
    校验表单：1.如果为空 2.如果表单数据和输入数据一致
需求：
  点击确定 
  1.发送请求更新后台
  2.更新redux中数据, 更新前台数据

## 商品管理
1. 静态页面 
2. 动态展示
  发送api请求，不需要存放redux，直接调用，得到响应结果
  - 后台请求 根据后台接口设计情况，只能得到1页数据就只能后台分类，获取全部数据就是前台分页
    第二页再发送请求
  - 默认请求第一页，一页3条数据；
3. 分页器动态展示
- 需求：根据请求的总商品数量，来显示页码
    - 使用分页器的属性total和响应数据total一致
    - 响应回来的数据有total===页码总页数
    - 测试：分页器显示页码成功，
- 需求：点击页码，重新发请求，请求当前页数据
    - onChange: this.reqGetProducts,  
    - 简写// (pageNum,pageSize)=>{this.reqGetProducts(pageNum,pageSize)}参数是改变后的页码及每页条数
- 需求： 放页码改成12，因为请求整个数据
    - onShowSizeChange: this.reqGetProducts  //pageSize 变化的回调

### 添加商品
1. 点击跳转路径 /product/add路由
2. 静态页面
 - Card Form Input Icon BraftEditor 
商品分类数据展示（只获取一次）
  如果redux中有商品数据，不用请求
  如果没有，请求分类数据
    那么分类管理不需要请求了
富文本编辑器：富文本编辑器不是antd的组件
  BraftEditor antd推荐
    https://github.com/margox/braft-editor
表单校验：
  getFieldDecorator()()
  Editor：结合antd的表单使用，在antd表单中使用
    https://braft.margox.cn/demos/antd-form
  *注意事项
- 编辑器组件的数据格式为ediorState，为此在调用setFieldsValue时和在提交之前，需要进行相应的转换
- 进行空值校验的话，需要自定义validator，并通过value.isEmpty()来校验，value就是一个editorState
- 编辑器组件的验证时机需要改成onBlur，以避免不期望的验证提示和不必要的性能开销

3. 功能
- 点击回退按钮
 history.goBack()
- 输入框数据校验
  校验输入框和富文本编辑器
     如果为空获取不存在 打印校验提示
- 获取商品分类信息
  从redux中获取数据：如果redux中有就用，没有就发请求获取
  动态展示在商品分类列表中
- 点击提交
  - Button htmltype=“submit”
  - 获取到校验后的数据： 
    - this.props.form.validateFields((err, values)从values获取
  - 1）发送api请求添加数据(发送请求传入Object（参数超过三个使用对象，防止参数传错）)
      - 富文本编辑器得到的value是一个对象：
        - 转换成html标签 toHTML()
      - 传数据给后台，转换为JSON，会把原型上的数据去掉，无法传递，得到的对象无法传递，所以不能传递对象
    2）提示添加成功，跳转到商品列表页面

- 国际化报错:(HeaderMain和左侧导航都需要改)
  HeaderMain
   - 创建子菜单的时候判断：改成以product开头
   - cMenu = menu.children.find(cmenu => pathname.startsWith(cmenu.path))
  LeftNav
   - 创建子菜单
   - 默认选中
      pathname = pathname.startsWith("/product") ? "/product" : pathname
  测试：国际化二级标题可以显示，也是默认选中

问题:
1. 添加小手样式未生效

### 修改商品 
1. 1）点击修改商品
   1. 跳转地址 
   2. 配置路由"/product/update"
  2）Product组件：加载添加商品的组件
  Product组件点击修改按钮传递当前商品信息给Form组件
    - 通过push 接受第二个参数，组件可以通过location.state获取
      ` this.props.history.push("/product/update", product)`
  3）From组件拿到数据
    判断是否有有值（值是state还是this.state.product）
    如果有值
      富文本框需要将html转为文本（看文档）

    查看this.props.location.state是否有值，startsWith
      - 有值：更新商品
        修改initialValue
      - 没有值： 添加商品
        product=null
      
2. 需求：刷新页面数据会丢失，地址在一个地方重新访问的时候；内存中没有数据
  脚手架有缓存机制，所以可以查看
  用户直接访问会被干掉
- 方法： 路径地址把产品id带上
- 使用
1. 修改ProductForm判断是否时修改操作的方法
- 判断当前路径是不是以"product/update开头"
  - 如果是: 修改商品操作
  - 不是: 添加商品操作
  没有值说明，页面没有缓存数据，
    DidMount中：发送api请求获取数据
    id获取：路由属性match
    数据请求回来定义为state product:null 不能设置为{}；
    只能设置一次有效值，之前的应该都是null

3. 更新的时候判断数据来源：（state或请求获取，“”/undefined）
  加上判断state.detail也有值
出bug：
  create
  关键代码：
    initialValue初始化值只能设置一次，如果设置多次，第一次生效
    设置多次，前提是多次都是有效值（至少不为空）

需求：
  1. 点击修改能保存数据
  2. 刷新能保存数据
  3. 新开页面能保存数据
### 商品详情
配置:
点击详情：
1. 传递当前商品信息给详情组件
2. 跳转到详情组件页面
	- 使用history.push接收第二个参数，子路由可以通过location.state拿到数据
	- product地址带上:id
	- 配置route.js路由
3. 定义组件ProductDetail
- 静态页面： antd Card和Descriptions描述列表组件
商品分类，状态，详情需要额外修改
- 获取商品分类信息 - redux
	一开始redux没有数据；
	发送请求获取:
	  redux中数据不存在才需要发送请求
	  const categoryName = category && category.name  //必须写与运算，第一次请求为空，请求后才有数据，不然一直报错
- 状态修改：
  1：下架
  2. 上架
detail： 
  react中会对数据进行转义处理会（包一个p标签）为了页面安全性
  正常显示内容：需要加上标签属性
	<div dangerouslySetInnerHTML={{ __html: detail }}></div>
4. 需求： 按钮回退：
	this.props.history.goBack();
5. 需求： 浏览器输入地址，内容将会干掉
  发送请求:reqGetProduct,根据当前id（this.props.history.match.params.id）请求当前商品
  修改状态数据product
  product初始化值{} ；防止如果没数据页面直接报错；
  所有页面展示数据从location.state中或this.state.product中获取

技术点：
  - 地址栏携带的id在哪里获取
    this.props.history.match.params.id
  - react返回回来的文本内容转义了，如何转换回来
    加上标签属性dangerouslySetInnerHTML
  - 商品分类名称获取一直报错
    一定需要有category才能有category.name ，是与运算
### 上架 
更新后端数据
更新前端数据：更新produc状态值
  {...product,status}后面的属性会覆盖前面你的属性

### 删除商品
- 点击“删除”按钮
	- 调用方法showDeleteProduct
	- 返回一个函数
	- 调用Modal.comfirm
		- onOk()
			- 发送请求showDeleteProduct更新后台数据
			- 更新前台products状态数据

### 搜索
思路: 
  添加点击事件,调用发送请求api;
  getProducts中判断是否是点击事件,是就发送请求,不是就搜索全部

1. 收集searchType，searchName
2. 点第二页拿到搜索的信息
  什么情况搜索商品，什么情况全部商品
3. 第二页搜索，显示的是第二页的数据
  获取当前页码current为受控
  点击第二页；触发change事件，获取pageNum将current村委state
4. 总页数 pageSize
5. 点击按钮的时候搜索，还是输入框有值的时候搜索

需求:
1. 什么情况搜索商品，什么情况全部商品
    - 看是否有searchValue
2. 如果在第二页，点击搜索，显示的是第一页数据
    - 原因：搜索传递的参数固定是 1 3 --> 永远搜的是第一页 3条数据
    - 解决：将 current: pageNum当前页数 受控起来
  2.1 点击pageSize(一页几个)也会导致问题:将pageSize受控起来
3. 输入iphone，没有点击搜索按钮。 不按照关键字去搜，而搜全部商品（一定要点击搜索按钮，才按照关键字去搜）
    问题二：第一次输入内容1，点击搜索。 第二次输入内容2，没有点击搜索。 搜索关键字是内容1还是内容2
    总结：必须点击搜索按钮才能搜索
## 用户管理
用户数据直接请求,不需要存储redux
1. 用户数据动态展示
  - 发送请求获取用户数据
  - 显示的是角色id,根据角色id获取角色名称
    - 从redux中获取角色信息,找到id相等的role
    - 如果this.props.roles没有数据,就发请求获取数据
2. 新增用户
 2.1 显示角色下拉列表
  父组件User将角色数据传递给AddForm组件
 新增请求发送后,1.清空表单数据2.修改前台用户列表数据

3. 删除用户
  * 关键点： 
    使用高阶函数和闭包拿到当前点击的用户信息
  * 思路：
    - 用户数据在Table表头定义，使用render方法传递到onClick事件中
    - onClick的回调函数deleteUser必须是一个函数；
    - 所以定义this.deleteUser return回来一个函数，
    - 里面被包裹元素使用闭包拿到当前点击删除的用户信息
      发送请求删除后台用户
      更新前台用户状态数据
4. 更新用户
问题：更新了，但是数据库密码没有加密，导致无法使用
  方法： 老师更新后天代码，对数据库进行md5加密
## 权限管理
数据放在redux中:
  权限管理需要进行权限展示
  用户管理需要权限的角色数据
1. 动态展示权限数据,发送请求从redux中获取
  - 使用dayjs格式化创建时间和授权时间
  - 授权时间有可能是空
2. 创建角色
  - 更新后台数据
  - 更新前台数据
3. 设置角色权限
  1. 显示角色名称
  2. 显示权限列表就是menu
    将menu转换为treeData格式 
    [{
    title: "0-0",
    key: "0-0",
    children: [
  3. 默认展示权限树
  4. 点击确认修改权限
  - 父组件手机Tree组件的选中权限数据  ## 树形组件数据收集
   难点:拿到Tree组件的数据
      问题:
        给Tree组件绑定Form的getFieldDecorator,还是收集不到数据
        以value收集到Tree数据
      原因:
        - Tree组件通过onCheck={this.onCheck}事件和checkedKeys属性收集数据
        - 但是父组件Form组件默认使用的是onChange事件收集数据
      解决:
        设置Form组件的
        trigger值为onCheck (收集子节点的时机)
        valuePropName: "checkedKeys",
        ` {getFieldDecorator("menus", {
            trigger: onCheck,  //收集子节点值的时机
            valuePropName: "checkedKeys", //收集子节点值的属性
          })(<Tree></Tree>`
      测试: 
        收集到选中Tree组件数据menus:Array
- 发送修改数据请求 
  - 需要{ roleId, authName, menus} 
    - roleId为this.state中
    - authName在redux中
  - 权限数据在redux中,所以走redux流程
4. 下次点击默认选中已有权限
  子组件Form获取menus,但是值为字符串
    - 问题: 发送请求是发送的是数组,但是请求回来是字符串
      - 因为请求拦截器中判断如果是post请求,将转为key:value形式,并拼串,但是传输过去的是字符串,数据拼串会调用toString方法转字符串
      - 解决
        请求拦截器request.js判断如果value是Array或Object就转JSON传输
        - 接受的时候使用JSON.parse解析成数组
      -测试 查看请求回来的menu现在是Array
      - bug处理：
        - 服务端修改响应和存入数据为数组
        - 客户端返回回来是数组，所以不需要JSON.parse解析成数组


## 管理权限
1. 过滤menus：
* 用户只能显示有权限的菜单项
  LeftNav中过滤
  config中的menus结合菜单栏中的menus：
	当前用户的menu：redux中user用户数据有个menu
方法：
	在创建菜单之前，将没有权限访问的菜单项过滤掉
	当前用户的权限：authMenus
	判断menus中的一级对象的path是否在authMenus中，
		使用reduce方法
		不包含, 可能子菜单只选中一个，还要检查子菜单，
			子菜单只有一层，可以用filter方法
			过滤二级菜单，但是不能改变原数组：const newMenu = { ...menu }; //为了不改变原数组
2. 过滤router
* 让没有权限的用户，即使输入地址，也无法跳转到相关路由
  配置文件不写逻辑，在组件中过滤
    1. App组件中的Switch直接挪到BasicLayout中
    2. 之前BasicLayout使用this.props.children属性拿到Switch内容
    3. BasicLayout可以直接拿到Switch的东西，不需要this.props.children引用
    4. 在BasicLayout做路由过滤的逻辑
    5. 对权限路由进行过滤展示
      判断authRoute.path是否等于用户的menu.path
      indexOf判断值，需要一模一样，但是我们有product开头的多个文件，所以使用find过滤
      /* 解析：
      !authRoute.path 就是notFind组件，没有path属性（没有path，就是404，直接放回）
      menu => authRoute.path === menu 匹配全部相等的
      product开头的三个路由都是在一个页面
      */
      `if (!authRoute.path) {
        return true
      } else if (menus.find(menu => authRoute.path === menu || menu.startsWith("product"))) {
        return true
      }`

## 主题工具
antd:
  拾色器:社区精选react-color
  分割线: 组件
改颜色: 
  不能直接改antd配置文件,配置文件在运行之前就已经设置了主题,运行中改了也没用
  可以创建style标签,我们的样式覆盖前面的
  方法:
  1. 创建style标签,
  2. 写入样式
  3. 插入页面中,放header标签中
问题: 
1. 会创建n个style标签, 性能差，尽量减少DOM操作
解决:
  DidMount中
    创建StyleEl标签 
        判断StyleEl是否存在,不存在才创建,并添加样式
    获取head标签
2. 刷新又没了
  持久化存储:LocalStorage
  颜色从LocalStorage中获取
  默认调用一次设置颜色
3. 下次点击的时候存储之前的颜色
  将之前的颜色存储
  取消的时候将之前的颜色设置当前颜色
  确认时

## 图形图标
方法1：echarts-for-react
  https://github.com/hustcc/echarts-for-react
方法2：echarts
  echarts: 需要全部都引入
方法3：antV: G2
  在 React / Vue / Angular 中使用 G2
    BizCharts 地址：https://bizcharts.net (最好用)
    Viser 地址：https://viserjs.github.io/
BizCharts
    图标实例：https://bizcharts.net/products/bizCharts/demo
    yarn add --dev @antv/data-set
    复制代码
    初始化数据：componenentDidMount
    data数据定义在state中
# antd
开箱即用的后台管理项目：
  https://preview.pro.ant.design/result/success
## 优化国际化
ConfigProvider
  antd的国际化配置
antd需要设置国际化,
自己写的文字也需要国际化
## 老师分支 xj

取消 ajax 请求,当点击子级菜单,父级菜单无需发送 ajax 请求

## axios 弄懂

umi 类似于react
移动端：react native
高阶组件：除了我们定义的和withRouter调用一次，其他都调用两次


# 问题:

1. backend.js:6 async-validator: ["用户名长度至少大于4位"] 
  控制台输出警告如何去除？
  
  解决：
    - 开发环境会有，上线生产环境就会去掉

2. 目-xjGit/class0722-react-admin (damu)
  $ git fetch origin damu:damu
  fatal: Refusing to fetch into current branch refs/heads/damu of non-bare repository
  
  解决：
    - 第一个拉去分支使用git fetch，之后使用git pull

3. es6模块化引入 
  1. export const errCodeMessage
    1. import的时候只能结构赋值
  2. export default
  3. 模块导入导出的问题,什么时候应该结构赋值引入
  
  解决：
    - 加default暴露出去的是一个东西;
    - 不加default暴露出去的是一个对象，需要结构引入

4. axios封装函数promise .then方法的数据传递流程

5. 不用this.props.children的时候，Layout已经是路由组件的父组件为什么路由组件的内容无法加载到Layout中；

  解决：
    - 因为Layout组件要加载其他的组件和路由组件
    不仅仅只加载路由组件；
    - 需要将路由组件的内容放在指定的位置显示，只能使用this.props.children

6. LeftNav组件中的@withRouter是不是就是使用了祖孙组件通信的context方法；使用Context.Consumer接受到Router组件的消息的；
还是直接拿到“react-router-dom”库上面的高阶组件？
  
  解决：
  - 是通过包裹的<Router>组件拿到的属性方法，<Router>组件将路由组件的属性方法一层层传递下来的
  - @withRouter拿到Router方法的路由属性

7. css line-height 和 height的区别，里面的文字对齐方式是什么？
  场景：HeaderMain样式
  line-height：文字在中间，height文字在最下面

8. 登出时，如果确认登陆，清楚用户数据后应该不需要跳转页面到登陆页面了吧？
  之前已经做过逻辑：登陆检测：withCheckLogin

9. bug:一点分类列表显示无效的token，但是redux中还是有token
  发送请求的时候，token设置为空
  解决： api/request.js判断token之前，从redux中获取token

10. export const addCategoryAsync = (categoryName) => {
    `  return dispatch => {
          return reqAddCategories(categoryName)
            .then((response) => {
              dispatch(addCategory(response))   ====> response不是返回一个对象吗
            })
        }
      }`

  解决：
    这是一个对象，存到redux中的数据是[{},{},{}]

11.  showUpdateCategory（category）闭包得到当前点击的列表项   //有点没懂
//一上来已经全部渲染完成，闭包里面有有三个category，点击的时候从闭包中拿到当前那个


12.setState不是一个函数
 说明全局对setState做过赋值操作


13.bug：
  当前用户删掉了，但是当前用户没有被注销，
  因为localStorage中的token没有清楚；
  搞清楚：当前用户的设计逻辑是怎样的？
  自己可以删除自己，还是自己在当前页面看不到自己

  退出登录后就无法再次登录