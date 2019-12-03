import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import ChatBox from "../components/chatBox/chatBox";

let socket;

const Chat = ({ location }) => {
  const ENDPOINT = "http://localhost:8079";

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [question, setQuestion] = useState("");

  // JOIN AND DISCONNECT
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, res => {
      // console.log(res);
    });

    // console.log(socket);

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

  // QUIZ QUESTIONS
  useEffect(() => {
    socket.on("quiz", question => {
      // console.log("question:::", question);
      setQuestion(question);
    });
  });

  // console.log("message:", message);
  // console.log("messages:", messages);

  return (
    <div>
      <div
        style={{
          width: "700px",
          margin: "auto",
          marginTop: "0",
          border: "2px solid #eee",
          borderRadius: "8px",
          padding: "20px"
        }}
      >
        <ChatBox messages={messages} question={question}></ChatBox>
        <input
          type="text"
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
          placeholder="Enter you message then hit Enter"
          style={{
            width: "100%",
            lineHeight: "30px"
          }}
        ></input>
      </div>
    </div>
  );
};

export default Chat;
