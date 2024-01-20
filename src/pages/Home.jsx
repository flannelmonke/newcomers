import Task from "../components/Task";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
export default function Home() {
  const [tasks, setTasks] = useState([]);

  // get tasks when component mounts first
  useEffect(() => {
    // receive tasks from API
    setTasks([
      {
        id: nanoid(),
        title: "Test 1",
        description: "Description 1",
        isCompleted: true,
      },
      {
        id: nanoid(),
        title: "Test 2",
        description: "Description 2",
        isCompleted: false,
      },
    ]);
  }, []);

  const taskElsArr = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        title={task.title}
        description={task.description}
        isCompleted={task.isCompleted}
      />
    );
  });
  return (
    <>
      <h1>Home</h1>
      {taskElsArr}
    </>
  );
}
