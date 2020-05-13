# umi
* 是什么? 
  - 蚂蚁金服团队开发的一个开发框架
  - 包含开发+路由
  - 不包含数据和试图
  - umi[工具+路由]+dva[数据]+antd(-mobile)[视图]
* 特点
  * 开发框架和库结合在一起了
  * 介绍说性能umi保障
  * 多端
* 和create-react-app对比?
  * 没有路由
  * 不支持自定义配置
 
* .umi临时文件
  * 包含入口文件，路由
 

# 问题? 
layout和路由的结合，侧边栏没有显示
2. 

# 基于umi的成熟项目
* antd-admin-master  "umi": "^2.13.0"
* antd-pro  "umi": "^3.0.14"
* 都是基于umi 2.0版本

# 学习注意点
1. 看清版本 最新3.0，完整项目用的都是2.0，差别很大
2. 插件的使用
   
# 使用
## 1. 目录
- .umi 临时文件夹（其他文件生成的）
- config
  - config.ts 配置文件（路由配置，插件配置）
- .umirc.ts 配置文件（路由配置，插件配置，优先级比config.ts高，二选一）

## 插件
  * @umijs/preset-react 针对react应用的插件集

## umi路由
  配置式
  约定式

# umi + dva
dva的路由交给了umi
其他的可以使用dva自己的数据流方案
方式：
  umi-plugin-dva
- 内置了dva，有一个umi-plugin-dva插件即可
- 内置了dva-loading
- 自动注册models目录下的文件为model
- history的query回来了，不许哟啊手动用query-string处理