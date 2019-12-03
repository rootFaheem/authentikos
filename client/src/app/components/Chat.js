import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const ENDPOINT = "http://localhost:8079";

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, res => {
      console.log(res);
    });

    console.log(socket);

    return () => {
      socket.emit("disconnect");
      scoekt.off();
    };
  }, [ENDPOINT, location.search]);

  return <div>chat</div>;
};

export default Chat;
