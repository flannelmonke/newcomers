import Task from "../components/Task";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "../components/Header";
import axios from "axios";
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  // get tasks when component mounts first
  useEffect(() => {
    // receive tasks from API
    async function fetchTasks() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tasks/get-all"
        );
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCompletedTask(userId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/get-user-by-id/${userId}`
        );
        console.log(response.data.completedTasks);
        setCurrentTask(tasks);
        setCompletedTasks(response.data.completedTasks);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTasks();
    fetchCompletedTask("65ac2c280e7962db1339cfed");
  }, []);
  // const taskElsArr = tasks.map((task, index, array) => {
  //   return (
  //     <Task
  //       key={task._id}
  //       title={task.title}
  //       description={task.description}
  //       isCompleted={index - 1 === array.length}
  //     />
  //   );
  // });

  const taskElsArr = completedTasks.map((task) => {
    return (
      <Task
        key={task._id}
        title={task.title}
        description={task.description}
        isCompleted={true}
        videoURL={task.videoURL}
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
