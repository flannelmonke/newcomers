require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { tasksRouter } = require("./routes/tasksRoute");
const { userRouter } = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 8000;

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//routes
app.use("/api/tasks", tasksRouter )
app.use("/api/users", userRouter);

app.listen(PORT, async () => {
  console.log(`Express app on ${PORT}`);

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb connected`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
