import express from "express";
import morgan from "morgan";
const app = express();

//* All routes controller imports
import userAuth from "./routes/userRoutes.js";

//* Middlewares set-up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//* All routes setup
app.use("/api/auth", userAuth);
export default app;
