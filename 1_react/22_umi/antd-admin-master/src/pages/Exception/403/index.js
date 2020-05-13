import React from "react"
import { Button } from "antd"
import styles from "./index.less"
import { router } from 'utils'

export default class Exception extends React.Component {
  goDashboard = () => {
    router.push({
      pathname: '/dashboard',
    })
  }
  render() {
    console.log('Exception', this.props);
    return (<div className={styles.wrap} >
      <h1 className={styles.title}>403</h1>
      <p className={styles.sorry}>Sorry, you don't have access to this page.</p>
      <Button onClick={this.goDashboard}>Back to Home</Button>
    </div>)
  }
}