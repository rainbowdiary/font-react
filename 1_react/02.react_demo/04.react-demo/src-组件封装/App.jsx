import React, { Component } from "react";
import { Modal, Button } from "antd"
import CardList from "./components/CardList";
import './App.module.css'

const { Card } = CardList;



class App extends Component {
  state = {
    loading: false,
    totalList: [
      { "trainCount": 2360, "stationName": "北京" },
      { "trainCount": 152, "stationName": "北京东" },
      { "trainCount": 4248, "stationName": "北京南" },
      { "trainCount": 3336, "stationName": "北京西" },
      { "trainCount": 56, "stationName": "通州" }]
  }

  // 闭包拿到当前所点击的按钮
  success = (obj) => {
    return function () {
      Modal.success({
        content: `${obj.stationName}站 ${obj.trainCount}车次`
      })
    }
  }

  render() {
    let info = <div>
      {this.state.totalList.map((obj, index) => {
        return <CardList
          title={`${obj.stationName}站`}
          extra={<Button type="link" onClick={this.success(obj)}>查看当天数据</Button>}
          key={index}
        >
          <Card title="当天进站列车:">{obj.trainCount || 0}车次</Card>
        </CardList>
      })}
    </div>
    return (<div className={test}> {info}</ div>)
  }
}

// export default withRouter(App);
export default App;