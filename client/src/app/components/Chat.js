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
  const [quizEnd, setQuizEnd] = useState([]);

  const [question, setQuestion] = useState("");
  const [choice, setChoice] = useState("");

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

  // QUIZ QUESTIONS
  useEffect(() => {
    socket.on("quiz", question => {
      // console.log("question:::", question);
      setQuestion(question);
    });

    socket.on("quizEnd", status => {
      console.log("status:", status);

      if (status === false) {
        setQuestion();
      }
      setQuizEnd(status);
    });
  });

  // PLAY QUIZ
  useEffect(() => {
    socket.emit("playQuiz", { choice, name }, () => {});

    socket.on("getresult", result => {
      // console.log("getQuizResults::", result);
      console.table(result.quizResults);
    });
  }, [choice, name]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

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
        <ChatBox
          messages={messages}
          question={question}
          quizEnd={quizEnd}
          choiceHandler={value => setChoice(value)}
        ></ChatBox>
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
