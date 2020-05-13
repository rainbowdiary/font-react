import React, { Component, Suspense } from 'react';
import Loadable from "react-loadable"
const Loading = function () {
  return <div>loading...</div>
}
const B = Loadable({
  loader: () => import("./B"),
  loading: Loading
})

export default class A extends Component {
  render() {
    return (<div>
      A...............
      <B />
    </div>);
  }
}
