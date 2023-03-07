import express from "express";
import morgan from "morgan";
//* All routes controller imports
import test from "./routes/route.js";
const app = express();

//* Middlewares set-up
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//* All routes setup
app.use("/api", async (req, res) => {
  res.json({ message: "Working Fine" });
});
export default app;
