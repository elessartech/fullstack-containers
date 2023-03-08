import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./Todo";

it("renders without problems", () => {
  const div = document.createElement("div");
  const testTodo = {
    text: "something",
    done: false,
  };
  const root = ReactDOM.createRoot(div);
  root.render(<Todo todo={testTodo} onClickDelete={() => {}} onClickComplete={() => {}} />)
});