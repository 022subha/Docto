import express from "express";
import morgan from "morgan";

const app = express();

//* Middlewares set-up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//* All routes controller imports
import test from "./routes/route.js";
//* All routes setup
app.use("/api", test);
export default app;
