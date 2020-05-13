# TS
## 是什么?what
JS高级

## 为什么?why 
提高开发效率

## 怎么用? how
**一、下载**
  npm install -g typescript
  tsc -V

**二、 如何编译成js**
* 方法1: 手动编译
  - tsc hello.ts

* 方法2: VScode监视配置文件自动编译
  - tsc --init
  - 生成tsconfig.json文件
  - 添加"outDir"
  - vscode顶部工具栏->终端->运行任务->tsc:监视tsconfig.json

* 方法3: webpack编译
  - 配置webpack.config.js
  - 下载typescript webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin - ts-loader cross-env
  - 入口文件引入ts文件，webpack自动打包ts文件

**三、ts数据类型**
  - 1. number
  - 2. string
  - 3. boolean
  - 4. null
  - 5. undefined
  - 6. array
    - let arr1: number[]
    - let arr2: Array<string> 
  - 7. tuple(元祖)
    - 约束数组的类型和长度
    - let arr: [string,number]
  - 8. enum(枚举)
    - 约束数字按照名称递增（默认值0）
  - 9. any
  - 10. void
    - 函数返回值为undefined以外都不行
  - 11. object
  - 12. 联合类型
    - a: string|number
  - 13. 类型断言 
    - let a: 123 赋值变量，断言为number类型
    - let b 未赋值变量，断言为any

**四、接口**

* 接口: 约束对象的类型，接口是对象属性和方法的描述 
* interface定义接口
  - 1. 接口描述对象类型
    - interface Iobj={}
  - 2. 接口描述函数类型
    (source: string, subscribe: string): boolean
  - 3. 接口描述类类型
    implement关键字 
  - 4. 接口继承
    interface A extends B,C{}

**五、类**
类的基本使用同ES6和类属性方法的约束
1. 类的定义
2. 类的继承
   1. 1. 重写: 子类重写父类方法
3. 类的多态
   1. 父类型引用指向子类型的实例 ===> 多态
   2. 子类型引用指向父类型实例 ===>子类型没有新的方法才可以
4. 类的修饰符
   1. public private protected readonly
5. 类的存取器
   1. get set
6. 类的静态属性 
   1. static关键字 (类本身的属性而不是实例对象上的)
7. 抽象类
   1. abstract关键字
   2. 不能被实例化 
   3. 抽象类必须包含抽象方法，
   4. 只能子类继承并实现该抽象方法

**六、函数**
1. 函数赋值的约束
   1. let fn:(x:string,y:string):string = function(x:string,y:string):string{}
2. 函数参数和返回值的约束
   1. 返回值 function():string{} 
   2. 默认参数 function(x:string= "A")
   3. 可选参数 function test(x?:string)
   4. 剩余参数 function test(x?:string,...args:string[]) 
3. 函数重载
   1. 重新进行更加严格的约束

**七、泛型**


28

十、功能
  变量数据类型的约束
  实现面向对象的功能



## 扩展