import React, { Component } from "react";
import Test from "./component/Test"

/* 0为假值但是页面出现0，怎么解决？ */

class App extends Component {
  state = {
    a: "hello"
  }
  render() {
    console.log(this.state.a);
    return (<div>
      {this.state.a && <Test /> || <Test />}
    </div>)
  }
}

export default App;