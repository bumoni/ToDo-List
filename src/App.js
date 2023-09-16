import { useState } from "react";
import { Todo } from "./Components/Todo";
import { NavBar } from "./Components/Nav";
import "./styles.css";
import "rsuite/dist/rsuite.min.css";
export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Todo />
    </div>
  );
}
