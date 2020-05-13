pages/index.js最外层
	 <Redirect to={i18n.t`/dashboard`} />	
	 component/pages
	 <Dashboard><Page><Row><Col><Card><Sales></Dashboard>
# 左侧菜单栏数据来源	 
import {arrayToTree} from "utils"
const menuTree = arrayToTree(menus, 'id', 'menuParentId')
{this.generateMenus(menuTree)}


# 分析（从外到内）
layouts/index.js                => <BaseLayout>{children}</BaseLayout>
layouts/BaseLayout.js{children} => <Container>{children}</Container>
layouts/PrimaryLayout.js{children} => 
  ```
	<Layout>
		<Sider {...siderProps} />
		<div></div>
		<Header {...headerProps} />
		<Content className={styles.content}>
          <Bread routeList={newRouteList} />
          {hasPermission ? children : <Error />}
        </Content>
    const newRouteList =
      lang !== 'en'
        ? routeList.map(item => {
          const { name, ...other } = item
          return {
            ...other,
            name: (item[lang] || {}).name || name,
          }
        })
        : routeList
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')
    const siderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }
   ```
routeList来源
/src/models/app.js
	const { queryRouteList, logoutUser, queryUserInfo } = api
	```
	    const { success, user } = yield call(queryUserInfo, payload)
      if (success && user) {
        const { list } = yield call(queryRouteList)
        const { permissions } = user
        let routeList = list
        if (
          permissions.role === ROLE_TYPE.ADMIN ||
          permissions.role === ROLE_TYPE.DEVELOPER
        ) {
          permissions.visit = list.map(item => item.id) //返回权限id
        } else {
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        store.set('routeList', routeList)
        store.set('permissions', permissions)
        store.set('user', user)
        store.set('isInit', true)
	```
queryRouteList来源
 /src/services/api.js
	  queryRouteList: '/routes',
    /mock/route.js
    ```
      {
        id: '2',
        breadcrumbParentId: '1',
        name: 'Users',
        zh: {
          name: '用户管理'
        },
        'pt-br': {
          name: 'Usuário'
        },
        icon: 'user',
        route: '/user',
      },
    ```

queryUserInfo来源
  const { success, user } = yield call(queryUserInfo, payload)
  queryUserInfo: 'GET /user',
  /mock/user.js
    ```response.user
      {
      id: 0,
      username: 'admin',
      password: 'admin',
      permissions: userPermission.ADMIN,
      avatar: randomAvatar(),
    },
    ```
	

# 侧边菜单栏增删改查
* 改： 修改名称等信息修改/mock/route.js
* 查： 原始数据为/mock/route.js
* 增： 
  * 1. 添加/mock/route.js左侧菜单栏
      ```
        {
        id: '45',
        breadcrumbParentId: '1', //面包屑，如果不是子菜单则是1，是子菜单则id指向父菜单id
        // menuParentId: '5',    //是子菜单，id指向父菜单id
        name: 'Exception',
        zh: {
          name: '异常处理'
        },
        'pt-br': {
          name: 'Exception'
        },
        icon: 'warning',
        route: '/exception',
      },
      ```
  * 2. 添加/src/pages/Exception添加相应的组件内容， 会自动注册
  三项的含义，不然会导致选中两项
  breadcrumbParentId: '1',  //面包屑，导航路径显示（不能重复）是子菜单则id指向父菜单id
    // menuParentId: '5',   //是不是子菜单，且指定父菜单的id
    name: 'Exception',      //中文名称


# 权限
跟/mock/route.js中每个菜单项的id有关
会被记录在user数据中的visit数组中

登录成功后设置token
 ```const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie(
        'token',
        JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
        {
          maxAge: 900000,
          httpOnly: true,
        }
      ) ```