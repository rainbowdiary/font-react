import React from 'react';
import style from "./index.css";

/**
 * 子组件内容
 * @param title 标题
 * @param children 内容
 * @param restProps 传入的自定义属性
 * @returns {*}
 * @constructor
 */

const Card = (props) => {
  const { title, children, ...restProps } = props
  return (
    <div>
      <div className={style.list1} {...restProps}>
        <span>{title}{children}</span>
      </div>
    </div>
  )
}

export default Card