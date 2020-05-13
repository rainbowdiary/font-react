import React, { useState, useEffect } from "react";
import axios from "axios";
import PubSub from "pubsub-js";

export default function List() {
  const [isLoading, setIsLoading] = useState("false")
  const [users, setUsers] = useState([])

  useEffect(() => {
    PubSub.subscribe("UPDATE_SEARCH_NAME", (msg, searchName) => {
      /*
        msg 就是消息名称 UPDATE_SEARCH_NAME
        data 发送过来的数据
      */
      // 发送请求
      setIsLoading(true)
      axios
        .get(`https://api.github.com/search/users?q=${searchName}`)
        .then(response => {
          setIsLoading(isLoading => false)
          const newUser = response.data.items.map(user => ({
            login: user.login,
            html_url: user.html_url,
            avatar_url: user.avatar_url
          }))
          setUsers(users => newUser)
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false)
          alert("网络错误~");
        });
    });
  }, [])
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (!users.length) {
    return <h1>enter name to search</h1>;
  }

  return (
    <div className="row">
      {users.map((user, index) => {
        return (
          <div className="card" key={index}>
            <a href={user.html_url}>
              <img src={user.avatar_url} alt="img" style={{ width: 100 }} />
            </a>
            <p className="card-text">{user.login}</p>
          </div>
        );
      })}
    </div>
  );
}