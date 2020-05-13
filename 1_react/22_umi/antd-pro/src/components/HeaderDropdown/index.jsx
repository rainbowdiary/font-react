/* 语言下拉列表 */
import { Dropdown } from 'antd';  //下拉菜单
import React from 'react';
import classNames from 'classnames'; //将多个classname连接再一起
import styles from './index.less';

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => ( 
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
);

export default HeaderDropdown;
