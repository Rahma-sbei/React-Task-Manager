const express = require("express");
const app = express();
const connectDb = require("./Configuration/connectDB");
const cors = require("cors");
const taskRoute = require("./Routes/taskRoute");
const userRoute = require("./Routes/userRoute");
const boardRoute = require("./Routes/boardRoute");
const eventRoute = require("./Routes/eventRoutes");
const expensesRoute = require("./Routes/expenseRoute");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
connectDb();
app.use(cors());

app.listen(port, (error) => {
  console.log(port);
  if (error) {
    console.log("Server Failed");
  } else {
    console.log(`Server Started on port ${port}`);
  }
});

app.use(express.json());
app.use("/api", taskRoute);
app.use("/api", userRoute);
app.use("/api", boardRoute);
app.use("/api", eventRoute);
app.use("/api", expensesRoute);
