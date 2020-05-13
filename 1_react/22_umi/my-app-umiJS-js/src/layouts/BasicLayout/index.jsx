import ProLayout, { SettingDrawer, DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from "react"
import { Link, useIntl, connect } from "umi"  //useIntl不知道是什么
import { GithubOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import Authorized from "@utils/Authorized"   //绝对路径不知道是否生效
import RightContent from "@/components/GlobalHeader/RightContent";
import logo from "../../assets/logo.svg";
// import "./BasicLayout.less"

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry,you are not authorized to access this page."
    extra={
      <Button type='primary'>
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
)

/* use Authorized check all menu item */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] }
    return Authorized.check()
  })

export default () => {
  return <ProLayout />
}