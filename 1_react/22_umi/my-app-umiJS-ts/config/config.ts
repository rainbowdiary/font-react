/* 配置文件： .umirc.ts配置文件(优先级高)
             config.ts配置文件
             配置项目和插件
*/
import { defineConfig } from "umi"  //使用umi defineConfig有语法提示
import proxy from "./proxy";

export default defineConfig({
  layout: {
    Header: true
  },
  antd: {},
  hash: false,
  proxy: proxy.dev, //配置代理
  targets: { ie: 11 }, //兼容到哪个版本
  // locale: { antd: true },
  routes: [ /* 路径: /dashboard/analysis  组件路径: 1) @/pages/Dashboard 2)./Dashboard => ./pages/Dashboard */
    // { path: "/", component: "@/pages/index" },
    { path: "/products", component: "@/pages/test" },
    // { path: "/products", component: "@/pages/products" },
    {
      path: '/',
      component: '@/layouts/BasicLayout.tsx', //指定以下页面的布局
      routes: [   //子路由
        {
          path: "/dashborad",
          name: "dashborad",
          icon: "dashborad",
          menu: { name: "dashboard", icon: "testicon" },
          routes: [ //子路由的子路由，组件用过props.children方式获取，且会带上BasicLayout组件
            { path: "/dashborad/analysis", name: "analysis", component: "./Dashboard/Analysis" },//路径指向./pages下
            { path: "/dashborad/monitor", name: "monitor", component: "./Dashboard/Monitor" },
            { path: "/dashborad/workplace", name: "workplace", component: "./Dashboard/Workplace" },
          ]
        }
      ]
    }
  ]
})




/*
pro 布局菜单的配置
{
  name: 'dashboard',
  icon: 'dashboard',
  hideInMenu: true,
  hideChildrenInMenu: true,
  hideInBreadcrumb: true,
  authority: ['admin'],
}
*/