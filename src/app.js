/* eslint-disable no-unused-vars */
import express from "express";
import connectDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { errorsManipulator } from "./middlewares/errorsManipulator.js";
import manipulator404 from "./middlewares/manipulator404.js";

const connection = await connectDataBase();

connection.on("error", (error) => console.error("Connection error", error));
connection.once("open", () => console.log("Database connection realized with success"));

const app = express();

routes(app);

app.use(manipulator404);

app.use(errorsManipulator);

export default app;