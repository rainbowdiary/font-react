# 目录结构:
知识点
- assets
- config
- docs
- mock
  - route.js 输出路由对象
    ```
    {
      [GET /api/v1/routes](req, res){
        res.status(200).json(database)  //mock后的数据
      }
    }
    ```
- public
- scripts
- src
  - components(普通组件)
    - DropOption
    - Editor
    - FilterItem
    - Layout(真正的布局页)
      - Bread.js
      - Header.js
      - Menu.js (左侧菜单栏) （查清楚他的父组件是谁，进一步查处menus在哪里）
      - Sider.js
      - index.js
    - Loader
    - Page
    - ScrollBar
    - index.js
      - export { MyLayout, Editor, FilterItem, DropOption, Loader, Page, ScrollBar }
  - e2e
  - layouts(布局)
    - BaseLayout.js
    - index.js
    - PrimaryLayout.js
    - PublicLayout.js
  - locales（语言包）
  - models（dva）
    - app.js
  - pages(路由组件)
    - chart
    - dashboard
      - components
        - browser.js
        - comments.js
        - completed.js
        - cpu.js
        - numberCard.js
        - quote.js
        - recentSales.js
        - sales.js
        - user.js
        - weather.js
        - index.js
      - services
        - dashboard.js
        - weather.js
      - index.js
      - model.js(dashboard)
    - login
      - index.js
      - model.js(login)
    - post
    - request
    - UIElement
    - user
    - 404.js
    - index.js
  - plugins
    - onError.js
  -services(发送请求)
    - app.js
      暴露键值对{removeUser: 'DELETE /user/:id'}
    - index.js
      - 返回请求数据
  - themes
    - default.less
    - index.less
    - mixin.less
    - vars.less
  - utils
    - city.js
    - config.js
    - constant.js(常量)
    - index.js
        export const router = myRouter
    - index.test.js
    - model.js
    - request.js(发送请求)
    - theme.js
- .env(环境变量)
- .umirc.js
  - 路由（exclude，update） 排除的路由和需要更新的路由
    - 需要更新的路由添加上了{path: /:lang(pt-br|en|zh)/user/:id} 语言路径
  - webpack优化配置
  - 静态资源文件所在的路径
  - theme主题
  - proxy天气api代理
	

# 主题theme
  - .umirc.js 配置文件定义主题
    ```theme: './config/theme.config.js', ``` 
  - /src/themes/default.less 
    - 使用了antd的主题less配置，并覆盖了一部分变量样式转换
    - 通过less-vars-to-js将变量样式信息转换为对象{}
    - .umirc.js使用对象指定

# 国际化 
  默认是en
  - .umirc.js 配置路由路径加上{path: /:lang(pt-br|en|zh)/user/:id} 语言路径
  - scripts
    - translate.js
  - /src/locales/${item.key}/messages.json 语言包
  - 左侧栏的数据国际化 /mock/route.js
      英文，中文都在route.js中配置
技术：LinguiJS框架 @lingui/react库
https://lingui.js.org/
- package.json
  ```
    "lingui": {
      "fallbackLocale": "en",
      "sourceLocale": "en",
      "localeDir": "src/locales",
      "srcPathDirs": [
        "src/pages",
        "src/layouts",
        "src/components",
        "src/layouts"
      ],
      "format": "minimal",
      "extractBabelOptions": {
        "presets": [
          "umi/babel"
        ]
      }
    },
    "scripts": {
      "add-locale": "lingui add-locale",
      "extract": "lingui extract",
      "trans": "lingui extract --clean && node ./scripts/translate.js",
    }
  ```
# 封装axios请求
-services（请求）
  - api.js
    暴露键值对{removeUser: 'DELETE /user/:id'}
  - index.js
    - 暴露一个APIFunction={}对象
    - 调用APIFunction中的方法时传入data参数，返回服务端响应的结果数据
    - 依赖utils/request.js拿到负端结果数据
      APIFunction={
          queryWeather: fn(params),
          removeUser: fn(data),  //需要使用的时候传入data参数
          ...(services.js中所有api)
      }

     * APIFunction分析
      0)将所有的key配置化为./api.js
        遍历所有的key，
        作为APIFunction的key，
        值为APIFunction[key]=gen(api[key])的返回值为一个函数fn(data)

        gen(api[key])对url进行转换prefix+传入的配置路径
        返回一个函数fn(data) 如果调用fn会返回一个utils/request.js拿到服务端响应的结果数据
    
- utils
  - request.js
    * 暴露request({url,data,method})方法
    * 返货一个promis对象，拿到请求后结果

    * request(){}分析
      0)组件传入的时候
        url 已经带了id url=/api/v1/user/123
        url没带id url=/api/v1/user/:id 通过data参数传过来data={id:123}
      1）url是否带了域名，带了域名去掉域名 urlMatch
      2）传入了data参数，将data参数传递给url转换为有效参数
        url=/api/v1/user/:id data={id：123} ==》 /api/v1/user/123
        通过pathToRegExp.compile(url)(data)实现
      3）url中有:id , data中也有{id:123} 去掉data中
        通过compile url已经将id转化为有效url /api/v1/user/123
        则去掉cloneData中的id项

      4)url = domain + url  ； url为域名+有效路径
        给传递的option={url,method,data} 赋值给转换后后的url，data，cancelToken
        根据option{url，data，method，cancelToken}发送axios请求
        返回一个promise，和请求后的数据
        {
              success: true,
              message: statusText, //来自服务器响应的 HTTP 状态信息
              statusCode: status,
              ...result,
            }

## 组件发送请求
通过上面的封装：
  只需要调用services.js 暴露对象中的key的方法，传入data就能拿到返回结果

# 路由
- umirc.js
  exclude路由
  update路由 加上语言路径前缀 {path: /:lang(pt-br|en|zh)/user/:id} 语言路径
- mock
  - route.js
    ```
    {
      [GET /api/v1/routes](req, res){
        res.status(200).json(database)  //mock后的数据
      }
    }
    ```
- util
  - index.js
    ```
    import umiRouter from 'umi/router'
    const routerAddLangPrefix = params => {
      if (!i18n) {
        return params
      }
      if (isString(params)) {
        params = addLangPrefix(params)
      } else {
        params.pathname = addLangPrefix(params.pathname)
      }
      return params
    }
    const myRouter = { ...umiRouter }

    myRouter.push = flow(
      routerAddLangPrefix,
      umiRouter.push
    )

    myRouter.replace = flow(
      routerAddLangPrefix,
      myRouter.replace
    )

    export const router = myRouter
    ```

# 左测导航栏的数据来源
/src/utils/index.js
```
/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  id = 'id',
  parentId = 'pid',
  children = 'children'
) {
  const result = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

```
```/src/components/Layout/Menu.js
import {arrayToTree} from "utils"
const menuTree = arrayToTree(menus, 'id', 'menuParentId')
{this.generateMenus(menuTree)}
```
# 数据中心dva
- src
  - models
    - app.js