import React, { useState } from "react";
import Form from "./TaskForm";
import TaskForm from "./TaskForm";

export default function Task({ title, description, taskId, userId }) {
  // console.log(videoURL);
  return (
    <div className="task">
      <h1 className="task-title">{title}</h1>
      <p className="task-description">{description}</p>
      <TaskForm taskId={taskId} userId={userId} />
    </div>
  );
}
