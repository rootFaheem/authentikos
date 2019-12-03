import React, { Fragment } from "react";

import userIcon from "../../../assets/user.png";

const chatBox = props => {
  console.log(props.messages);

  const { messages } = props;

  return (
    <div>
      <div
        style={{
          color: "#fff",
          background: "#0080ff",
          textAlign: "center"
        }}
      >
        <h1 style={{ padding: "10px" }}>The Selector Quiz</h1>
      </div>
      <div
        style={{
          padding: "40px 0px"
        }}
      >
        <ul
          style={{
            listStyle: "none"
          }}
        >
          {messages
            ? messages.map((item, _i) => (
                <div key={_i} style={{ display: "flex" }}>
                  <li
                    style={{
                      background: "#eee",
                      padding: "15px",
                      margin: "10px",
                      display: "inline"
                    }}
                  >
                    {item.text}
                  </li>
                  <div
                    style={{
                      paddingTop: "20px",
                      marginLeft: "50px"
                    }}
                  >
                    <img
                      style={{
                        display: "inline"
                      }}
                      src={userIcon}
                    ></img>
                    <p
                      style={{
                        display: "inline",
                        marginLeft: "5px",
                        fontStyle: "italic"
                      }}
                    >
                      {item.user}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default chatBox;
