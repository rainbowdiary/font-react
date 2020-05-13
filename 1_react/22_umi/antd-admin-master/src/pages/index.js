import React, { PureComponent } from 'react'
import Redirect from 'umi/redirect'
import { withI18n } from '@lingui/react'  

@withI18n() //高阶组件将i18n传给组件当this.props
class Index extends PureComponent {
  render() {
    const { i18n } = this.props 
    return <Redirect to={i18n.t`/dashboard`} />
  }
}

export default Index
