import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const ENDPOINT = "http://localhost:8079";

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // JOIN AND DISCONNECT
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
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // MESSAGE HANDLING
  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log("message:", message);
  console.log("messages:", messages);

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      ></input>
    </div>
  );
};

export default Chat;
