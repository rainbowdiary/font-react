import React, { Component } from 'react';
import Times from './components/times'
import TodoList from './components/todolist'
class App extends Component {
  render() {
    return (<div>
      <Times />
      <br />
      {/* <TodoList /> */}
    </div>)
  }
}
export default App;
