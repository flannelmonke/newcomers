import Task from "../components/Task";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "../components/Header";
import axios from "axios";
export default function Home() {
  const [tasks, setTasks] = useState([]);

  // get tasks when component mounts first
  useEffect(() => {
    // receive tasks from API
    async function fetchTasks() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tasks/get-all"
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTasks();
  }, []);

  const taskElsArr = tasks.map((task, index, array) => {
    return (
      <Task
        key={task.id}
        title={task.title}
        description={task.description}
        isCompleted={index - 1 === array.length}
      />
    );
  });
  return (
    <>
      <Header />
      <h1>Home</h1>
      {taskElsArr}
    </>
  );
}
