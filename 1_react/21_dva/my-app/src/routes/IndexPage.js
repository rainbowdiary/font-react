/* 路由组件 */
import React from 'react';
import { connect } from 'dva';
import { Button } from "antd"
import Icon from "@ant-design/icons/lib"
import "antd/dist/antd.css";
import styles from "./IndexPage.less"

const CountApp = ({ count, dispatch }) => {  //参数通过connect获得
  console.log(Button, Icon);
  return (
    <div className={styles.wrap}>
      <Icon type="caret-up" />
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.count}>{count.current}</div>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          type="primary"
          size="large"
          onClick={() => { dispatch({ type: 'count/add' }) }}
        >+</Button>
        <Button
          className={styles.button}
          type="primary"
          size="large"
          onClick={() => { dispatch({ type: 'count/remove' }) }}
        >-</Button>
      </div>
    </div >
  );
}


const mapStateToProps = ({ count }) => {  //state=>props，注册了一个dispatch
  // console.log(count);
  // const loading = state.loading.effects['count/remove'];
  // console.log(loading);
  return { count }//{record: 0, current: 0}
}

export default connect(mapStateToProps)(CountApp);
// export default connect(({ count }) => ({ count }))(CountApp);
