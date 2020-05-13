import React, { useRef } from "react";
import PubSub from "pubsub-js";

export default function Search() {
  const inputRef = useRef("")
  function search() {
    const searchName = inputRef.current.value.trim()
    if (!searchName) return;
    // 发布消息
    PubSub.publish("UPDATE_SEARCH_NAME", searchName);
    inputRef.current.value = ''
  }
  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input
          ref={inputRef}  //容易写错
          type="text"
          placeholder="enter the name you search"
        />
        <button onClick={search}>Search</button>
      </div>
    </section>
  );
};