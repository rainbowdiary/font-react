import React, { Component } from 'react';
import styles from "./index.css";

console.log(styles);

/**
 * CardList组件内容
 * @param titile 组件标题
 * @param extra 描述
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @return {*}
 * @constructor
 */

const CardList = (props) => {
  const { title, extra, children, ...restProps } = props;
  console.log('CardList', props);
  return (<div>
    <div className={styles.card2} {...restProps}>
      <nav>{title}<span className={styles.details}>{extra}</span></nav>
      {React.Children.map(children, child => (child ? React.cloneElement(child, {}) : child))}
    </div>
  </div>)
}

export default CardList;