import React from 'react'

import Search from './components/search'
import Main from './components/main'

/*
应用根组件
 */
export default function App () {
  return (
    <div className="container">
      <Search/>
      <Main/>
    </div>
  )
}