import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
import { Loader } from 'components'
import { queryLayout } from 'utils'
import NProgress from 'nprogress'
import config from 'utils/config'
import withRouter from 'umi/withRouter'

import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import './BaseLayout.less'

const LayoutMap = {
  primary: PrimaryLayout, //私有布局
  public: PublicLayout,  //公开布局
}

@withRouter //拿到路由组件的东西
@connect(({ loading }) => ({ loading }))
class BaseLayout extends PureComponent {
  previousPath = ''

  render() {
    const { loading, children, location } = this.props
    console.log(this.props, 'BaseLayout');  //获取当前的路径 location: {pathname: "/en/dashboard", search: "", query: {…}, hash: "", key: "ze7izx"}
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)] //LayoutMap[primary]
    /*如果当路径是/zh/dashboard Container=PrimaryLayout */
    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      NProgress.start() //进度条开始
    }

    if (!loading.global) {
      NProgress.done() //进度条技术
      this.previousPath = currentPath
    }

    return (
      <Fragment>
        <Helmet> {/*管理文件头的改动*/}
          <title>{config.siteName}</title>
        </Helmet>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        <Container>{children}</Container>
      </Fragment>
    )
  }
}

BaseLayout.propTypes = {
  loading: PropTypes.object,
}

export default BaseLayout
