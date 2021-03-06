import React, { Fragment } from "react";

const chatBox = props => {
  const { messages, question, quizEnd } = props;
  let quiz = false;

  if (question) {
    quiz = true;
  }

  return (
    <div
      style={{
        height: "600px"
      }}
    >
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
          {quiz && question && quizEnd !== true ? (
            <div>
              <h3>{question.question}</h3>
              <ul style={{ listStyle: "none" }}>
                {question.answers.map((answer, _i) => (
                  <li
                    key={_i}
                    style={{
                      background: "#eee",
                      padding: "10px 30px",
                      margin: "20px"
                    }}
                    onClick={() => {
                      console.log("choice:", _i);
                      props.choiceHandler(_i);
                    }}
                  >
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              {console.log("props.quizResult", props.quizResult)}
              {props.quizResult.length !== 0 ? (
                <h3> Your Score: {props.quizResult} out of 5</h3>
              ) : (
                <i>Quiz will start in 1 minute... </i>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default chatBox;
