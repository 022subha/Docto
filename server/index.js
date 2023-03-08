import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

//Env file config
dotenv.config();

//Database connection
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port ${process.env.PORT}`);
});
