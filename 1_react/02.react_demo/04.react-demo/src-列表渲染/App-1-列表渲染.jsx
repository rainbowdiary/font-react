import React, { Component } from "react";

export default class App extends Component {
  state = {
    users: [
      { username: "Alian wilison", userIcon: "imgSrc", id: "a1" },
      { username: "Awan killer", userIcon: "imgSrc", id: "a2" },
      { username: "Awan lili", userIcon: "imgSrc", id: "a2" }
    ]
  }



  render() {
    const { users } = this.state
    const elementList = [];
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      elementList.push(<div key={user.id}>
        <p>{user.username}</p>
        <button>点击</button>
      </div>)
    }
    console.log(elementList);
    return (<>
      {this.state.users.map(user => {
        return (<> {elementList}</>)
      })
      }
    </>)
  }
}