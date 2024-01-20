import React, { useState } from "react";
import Form from "./TaskForm";

export default function Task({ title, description, isCompleted }) {
  const [completed, setCompleted] = useState(false);
  return (
    <div className="task">
      <h1 className="task-title">{title}</h1>
      <p className="task-description">{description}</p>
      <Form />
    </div>
  );
}
