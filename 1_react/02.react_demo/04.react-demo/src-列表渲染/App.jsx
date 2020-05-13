import React, { Component } from "react";
import { Grid } from "react-virtualized"
import "./App.css";
/*
同时渲染多个DOM节点会造成问题：
  1. 容易失帧，因为渲染很慢，无法维持浏览器的帧率，主观上会显得页面卡顿
  2. 网页失去响应,事件等无法及时被渲染
  3. 白屏时间长
  4. 无优化渲染移动端缺点更明显，
    长列表的渲染在移动端的很多场景都会遇到，比如微博，feeds流中等，合理优化长列表，可以提升用户体验

虚拟列表优化长列表的原理
  1. 用数组保存所有列表元素的位置，只渲染可视区内的列表元素，
  2. 当可视区滚动时，根据滚动的offset大小以及所有列表元素的位置，计算在可视区应该渲染哪些元素怒
*/
export default class App extends Component {
  list = [
    ['Jony yu', 'Software Engineer', 'Shenzhen', 'CHINA', 'GUANGZHOU'],
    ['Jony yu', 'Software Engineer', 'Shenzhen', 'CHINA', 'GUANGZHOU'],
    ['Jony yu', 'Software Engineer', 'Shenzhen', 'CHINA', 'GUANGZHOU'],
    ['Jony yu', 'Software Engineer', 'Shenzhen', 'CHINA', 'GUANGZHOU'],
    ['Jony yu', 'Software Engineer', 'Shenzhen', 'CHINA', 'GUANGZHOU'],
    ['Jony yu', 'Software Engineer', 'Shenzhen', 'CHINA', 'GUANGZHOU']
  ];

  cellRenderer = ({ columnIndex, key, rowIndex, style }) {
  return (
    <div
      key={key}
      style={style}
    >
      {list[rowIndex][columnIndex]}
    </div>
  )
}
render(
  <Grid
    cellRenderer={cellRenderer}
    columnCount={list[0].length}
    columnWidth={100}
    height={300}
    rowCount={list.length}
    rowHeight={80}
    width={300}
  />,
  rootEl

/*   作者：yuxiaoliang
  链接：https://juejin.im/post/5c048f25e51d450d16620d8d
  来源：掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
}
