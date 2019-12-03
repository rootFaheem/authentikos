import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <h1> Join </h1>
      <input
        type="text"
        placeholder="Name"
        onChange={event => setName(event.target.value)}
      ></input>

      <input
        type="text"
        placeholder="Room"
        onChange={event => setRoom(event.target.value)}
      ></input>

      <Link
        to={`/chat?name=${name}&room=${room}`}
        onClick={event => (!name || !room ? event.preventDefault() : null)}
      >
        <button type="submit"> Sign in</button>
      </Link>
    </div>
  );
};

export default Join;
