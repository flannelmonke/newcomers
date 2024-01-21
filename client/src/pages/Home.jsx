import Task from "../components/Task";
import { useState, useEffect } from "react";
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

    async function fetchCompletedTasks(userId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/get-user-by-id/${userId}`
        );
        console.log("fetchCompletedTask: ", response.data.completedTasks);
        // setCurrentTask(tasks);
        setCompletedTasks(response.data.completedTasks);
        setUser(response.data);
        console.log("user:", response.data);
      } catch (error) {
        console.log(error);
      }
    }

    //fetchCurrentTask

    fetchTasks();
    fetchCompletedTasks("65ac2c280e7962db1339cfed");
  }, []);

  //for fetching and setting fetchCurrentTask
  useEffect(() => {
    async function fetchCurrentTask() {
      console.log(
        "completed tasks array from fetchCurntTasks: ",
        completedTasks
      );
      const mostRecentlyCompletedTask = [...completedTasks].sort(
        (a, b) => a.level - b.level
      )[0];

      // completedTasks[completedTasks.length - 1];
      console.log("most recently completed task: ", mostRecentlyCompletedTask);

      const taskId = mostRecentlyCompletedTask.taskId;
      const response = await axios.get(
        `http://localhost:8000/api/users/get-current-task/${taskId}`
      );

      console.log("fetchCurrentTask response.data: ", response.data);
      setCurrentTask(response.data);
    }

    if (completedTasks.length > 0) {
      fetchCurrentTask();
    }
  }, [completedTasks]);

  const taskElsArr = completedTasks.map((task) => {
    const completedTask = tasks.find((el) => el._id === task.taskId);
    console.log("line 58 home.jsx completedTask", completedTask);
    // find the task out of the array by id!
    console.log(task);
    // const taskElements = task.map();
    // if (!completedTask) {
    //   return null;
    // }
    return (
      completedTask && (
        <Task
          key={completedTask._id}
          title={completedTask.title}
          description={completedTask.description}
          isCompleted={true}
          videoURL={task.videoURL}
          userId={task._id}
          taskId={completedTask._id}
        />
      )
    );
  });

  const currentTaskDisplay = currentTask && (
    <>
      <h1 style={{textAlign: "center"}}>Current Task!</h1>

      <Task
        key={currentTask._id}
        title={currentTask.title}
        description={currentTask.description}
        isCompleted={true}
        // videoURL={currentTask.videoURL}
        // userId={currentTask._id}
        taskId={currentTask._id}
      />
    </>

    // <div>
    //   <h3>{currentTask.title}</h3>
    // </div>
  );
  return (
    <>
      <Header />
      <h1>Home</h1>
      {taskElsArr}

      {currentTaskDisplay}
    </>
  );
}
