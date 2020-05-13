/* 测试react-motion */

import React, { Component } from 'react';
import { Motion, spring } from "react-motion"
class Test extends Component {
  state = {}
  render() {
    return (
      <Motion defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
        {value => <div>{value.x}</div>}
      </Motion>
    );
  }
}

export default Test;