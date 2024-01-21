import React, { useState } from "react";
import TaskForm from "./TaskForm";

export default function Task({ title, description, taskId, userId, videoURL, level }) {
  console.log(videoURL);
  return (
    <div className="task">
      <h1 className="task-title">{title}</h1>
      <h3>Level: {level}</h3>
      <p className="task-description">{description}</p>

      {videoURL ? (
        <video controls width="300">
          <source src={videoURL} type="video/mp4" />
        </video>
      ) : null}

        
      <TaskForm taskId={taskId} userId={userId} />
    </div>
  );
}
