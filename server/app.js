import cors from "cors";
import express from "express";
import morgan from "morgan";
const app = express();

//* All routes controller imports
import doctorRoute from "./routes/doctorRoutes.js";
import userAuth from "./routes/userRoutes.js";

//* Middlewares set-up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//* All routes setup
app.use("/api/auth", userAuth);
app.use("/api", doctorRoute);
export default app;
