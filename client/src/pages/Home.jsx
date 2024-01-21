import Task from "../components/Task";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "../components/Header";
import axios from "axios";
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
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
        setUser(response.data);
        console.log("user:", response.data);
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
    const completedTask = tasks.find((el) => el._id === task.taskId);
    console.log("line 58 home.jsx", completedTask);
    // find the task out of the array by id!
    console.log(task);
    return (
      <Task
        key={completedTask._id}
        title={completedTask.title}
        description={completedTask.description}
        isCompleted={true}
        videoURL={completedTask.videoURL}
        userId={task._id}
        taskId={completedTask._id}
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
